// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract FakeKairos is ECDSA {
    function borrow(IERC721 implem, uint tokenId, uint amount, bytes signature) external {
        
    }
}