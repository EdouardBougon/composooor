// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./IFlashBorrower.sol";

contract FlashLender {
    IERC20 private immutable wEth;

    constructor(IERC20 _wEth) {
        wEth = _wEth;
    }

    function flashBorrow(uint amount, bytes memory callbackData) external {
        wEth.transfer(msg.sender, amount);
        IFlashBorrower(msg.sender).flashCallback(callbackData);
        wEth.transferFrom(msg.sender, address(this), amount);
    }
}