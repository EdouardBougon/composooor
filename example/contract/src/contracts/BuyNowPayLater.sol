// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./ComposooorRegister.sol";
import "./FakeKairos.sol";
import "./FlashLender.sol";
import "./IFlashBorrower.sol";
import "./MarketPlaceComposooored.sol";

contract BuyNowPayLater is IFlashBorrower, MarketPlaceComposooored {
    IERC20 constant WETH = IERC20(address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2));
    FakeKairos private kairos;
    FlashLender private flashLender;
    MarketPlace private market;
    IERC721 private nft;

    constructor(FakeKairos _kairos, FlashLender _flashLender, MarketPlace _market, IERC721 _nft) {
        kairos = _kairos;
        flashLender = _flashLender;
        _market = market;
        _nft = nft;
    }

    function buyNowPayLater() external {
        flashLender.flashBorrow(1 ether, abi.encode(nft, 1));
    }

    function flashCallback(bytes memory callbackData) external {
        (IERC721 implem, uint tokenId) = abi.decode(callbackData, (IERC721, uint));
        marketPlaceBuy(implem, tokenId);
        kairos.borrow(implem, tokenId, 7 ether / 10);
        WETH.transferFrom(msg.sender, address(this), 3 ether / 10);
    }
}
