// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./IFlashBorrower.sol";

contract FlashLender {
    IERC20 constant WETH = IERC20(address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2));
    
    function flashBorrow(uint amount, bytes memory callbackData) external {
        WETH.transfer(msg.sender, amount);
        IFlashBorrower(msg.sender).flashCallback(callbackData);
        WETH.transferFrom(msg.sender, address(this), amount);
    }
}