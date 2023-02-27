// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract FakeKairos {
    IERC20 constant WETH = IERC20(address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2));

    // function borrow(IERC721 implem, uint tokenId, uint amount, bytes memory signature) external {
    //     implem.safeTransferFrom(msg.sender, address(this), tokenId);
    //     address lender = ECDSA.recover(keccak256(abi.encode(amount)), signature);
    //     WETH.transferFrom(lender, msg.sender, amount);
    // }

    function borrow(IERC721 implem, uint tokenId, uint amount) external {
        implem.safeTransferFrom(msg.sender, address(this), tokenId);
        WETH.transfer(msg.sender, amount);
    }
}