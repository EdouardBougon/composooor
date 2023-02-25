// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface IFlashBorrower {
    function flashCallback() external;
}