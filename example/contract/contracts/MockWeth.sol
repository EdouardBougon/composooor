// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockWeth is ERC20 {
    constructor() ERC20("Wrapped Ethereum", "WETH") {
        _mint(msg.sender, 100_000_000 ether);
    }

    function give(address to) public {
        _mint(to, 100 ether);
    }
}
