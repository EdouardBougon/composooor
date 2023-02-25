// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/// @title Composooor Parameter Register
/// @author Kairos Loan (@kairos-loan)
/// @notice as a user, use this contract to record offchain-computed parameters
///     as a contract, use it to consume those parameters
/// @dev to create your adapter, inherit from this contract
contract ComposooorRegister {
    error MissingOffchainDataError(bytes32 url, bytes32 abiArgs);

    // possible future improvement : support multiple data objects for the same tx

    mapping(address => mapping(uint => bytes)) private data;
    mapping(address => uint) private nonce; // number given is considered used

    /// @notice record a parameter for a one-time usage
    function recordParameter(bytes calldata _data) external {
        data
            [tx.origin]
            [nonce[tx.origin] + 1] 
            = _data;
    }

    /// @notice as a contract, consume a pre-computed parameter,
    ///     successive calls will give different parameters (computed for context)
    /// @dev correctness of the data MUST be checked
    function consumeParameter(bytes32 url, bytes32 abiArgs) external returns (bytes memory data_){
        data_ = data[tx.origin][nonce[tx.origin] + 1];
        if (data_.length == 0){
            revert MissingOffchainDataError(url, abiArgs);
        }
        nonce[tx.origin]++;
    }
}