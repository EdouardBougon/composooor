// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./ComposooorRegister.sol";
import "./FakeKairos.sol";
import "./FlashLender.sol";
import "./IFlashBorrower.sol";
import "./MarketPlaceComposooored.sol";

contract BuyNowPayLater is IFlashBorrower, MarketPlaceComposooored {
    ComposooorRegister private register;
    FakeKairos private kairos;
    FlashLender private flashLender;
    MarketPlace private market;
    IERC721 private nft;
    IERC20 private wEth; 

    constructor(
        ComposooorRegister _register,
        FakeKairos _kairos,
        FlashLender _flashLender,
        MarketPlace _market,
        IERC721 _nft,
        IERC20 _wEth
    ){
        register = _register;
        kairos = _kairos;
        flashLender = _flashLender;
        market = _market;
        nft = _nft;
        wEth = _wEth;
    }

    function buyNowPayLater() external {
        flashLender.flashBorrow(1 ether, abi.encode(nft, 1));
    }

    function flashCallback(bytes memory callbackData) external {
        (IERC721 implem, uint tokenId) = abi.decode(callbackData, (IERC721, uint));
        marketPlaceBuy(implem, tokenId);
        kairos.borrow(implem, tokenId, 7 ether / 10);
        wEth.transferFrom(msg.sender, address(this), 3 ether / 10);
    }
}