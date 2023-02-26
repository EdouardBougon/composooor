// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/// @notice smart contract wallet enabling batch of actions in one transaction
contract SmartContractWallet {
    address private immutable owner;

    constructor() {
        owner = msg.sender;
    }

    struct Call {
        address callee;
        bytes4 functionSelector;
        bytes data;
    }
    
    function execute(Call[] memory calls) external {
        bool success;
        require(msg.sender == owner);

        for(uint8 i; i < calls.length; i++) {
            (success, ) = calls[i].callee.call(abi.encodeWithSelector(calls[i].functionSelector, calls[i].data));
            require(success);
        }
    }
}