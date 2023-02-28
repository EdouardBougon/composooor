// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@composooor/ComposooorRegister.sol";
import "./MarketPlace.sol";

contract MarketPlaceComposooored is ComposooorRegister {
    MarketPlace private immutable marketplace;

    constructor(MarketPlace _marketplace) {
        marketplace = _marketplace;
    }

    function marketPlaceBuy(IERC721 implem, uint tokenId) internal {
        bytes memory data = consumeParameter("http://localhost:8080/api/buy", abi.encode(implem, tokenId));
        (SaleOffer memory saleOffer, bytes memory signature) = abi.decode(data, (SaleOffer, bytes));
        marketplace.buy(saleOffer, signature);
    }
}
