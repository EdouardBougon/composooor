// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "./ComposooorRegister.sol";
import "./MarketPlace.sol";

contract MarketPlaceComposooored is ComposooorRegister {

    MarketPlace private constant marketplace = MarketPlace(address(bytes20(keccak256(abi.encode("marketplace")))));

    function marketPlaceBuy(IERC721 implem, uint tokenId) internal {
        bytes memory data = consumeParameter("http://marketplace.api.composooor.com", abi.encode(implem, tokenId));
        (SaleOffer memory saleOffer, bytes memory signature) = abi.decode(data, (SaleOffer, bytes));
        marketplace.buy(saleOffer, signature);
    }
}