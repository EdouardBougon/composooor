// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @notice NFT marketplace
contract MarketPlace {
    IERC20 constant WETH = IERC20(address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2));

    struct SaleOffer {
        IERC721 implem;
        uint tokenId;
        uint price;
    }

    /// @notice buy a NFT from an offer to sell, signed by seller
    function buy(SaleOffer memory offer, bytes memory signature) external {
        address seller = ECDSA.recover(keccak256(abi.encode(offer)), signature);
        WETH.transferFrom(msg.sender, seller, offer.price);
        offer.implem.transferFrom(seller, msg.sender, offer.tokenId);
    }
}