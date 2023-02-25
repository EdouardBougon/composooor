// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./ComposooorRegister.sol";
import "./FakeKairos.sol";
import "./FlashLender.sol";
import "./IFlashBorrower.sol";
import "./MarketPlace.sol";

contract BuyNowPayLater is IFlashBorrower {
    ComposooorRegister private register;
    FakeKairos private kairos;
    FlashLender private flashLender;
    MarketPlace private market;

    constructor(ComposooorRegister _register, FakeKairos _kairos, FlashLender _flashLender, MarketPlace _market){
        register = _register;
        kairos = _kairos;
        flashLender = _flashLender;
        _market = market;
    }

    function flashCallback() external{}

}