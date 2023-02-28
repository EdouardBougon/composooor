// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

struct Call {
    address callee;
    bytes4 functionSelector;
    bytes data; // must be abi encoded !
}

/// @notice smart contract wallet enabling batch of actions in one transaction
contract SmartContractWallet {
    address private immutable owner;

    constructor() {
        owner = msg.sender;
    }
    
    function execute(Call[] memory calls) external {
        bool success;
        bytes memory result;
        require(msg.sender == owner);

        for(uint8 i; i < calls.length; i++) {
            (success, result) = calls[i].callee.call(bytes.concat(calls[i].functionSelector, calls[i].data));
            if (!success) {
                assembly {
                    revert(add(result,32),mload(result))
                }
            }
        }
    }
}