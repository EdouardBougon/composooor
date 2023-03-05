// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

struct SaleOffer {
    IERC721 implem;
    uint256 tokenId;
    uint256 price;
}

/// @notice NFT marketplace
contract MarketPlace {
    IERC20 private immutable wEth;

    constructor(IERC20 _wEth) {
        wEth = _wEth;
    }

    /// @notice buy a NFT from an offer to sell, signed by seller
    /// https://eips.ethereum.org/EIPS/eip-191#specification
    function buy(SaleOffer memory offer, bytes memory signature) external returns (address seller) {
        bytes32 digest = keccak256(abi.encode(offer));
        bytes32 message = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", digest));
        seller = ECDSA.recover(message, signature);
        wEth.transferFrom(msg.sender, seller, offer.price);
        offer.implem.transferFrom(seller, msg.sender, offer.tokenId);
    }
}
