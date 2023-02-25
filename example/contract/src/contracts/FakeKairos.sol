// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract FakeKairos is IERC721Receiver, ECDSA {
    function onERC721Received(
        address,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        (uint amount, bytes memory signature) = abi.decode(data, (uint, bytes));



        return this.onERC721Received.selector;
    }
}