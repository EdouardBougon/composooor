// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "forge-std/Test.sol";

import "../contracts/MockWeth.sol";
import "../contracts/BuyNowPayLater.sol";
import "../contracts/FlashLender.sol";
import "../contracts/MarketPlace.sol";
import "../contracts/MockNFT.sol";
import "../contracts/SmartContractWallet.sol";

contract TestFull is Test {
    MockWeth wEth;
    BuyNowPayLater buyNowPayLater;
    FakeKairos kairos;
    FlashLender flashLender;
    MarketPlace marketPlace;
    MockNFT nft;
    SmartContractWallet wallet;
    bytes emptyBytes;

    function setUp() public {
        wEth = new MockWeth();
        kairos = new FakeKairos(wEth);
        flashLender = new FlashLender(wEth);
        marketPlace = new MarketPlace(wEth);
        nft = new MockNFT();
        wallet = new SmartContractWallet();
        buyNowPayLater = new BuyNowPayLater(kairos, flashLender, marketPlace, nft, wEth);

        wEth.transfer(address(flashLender), 10 ether);
        nft.transferFrom(address(this), address(marketPlace), 1);
    }

    function testFull() public {
        Call memory bnplCall = Call({
            callee: address(buyNowPayLater),
            functionSelector: buyNowPayLater.buyNowPayLater.selector,
            data: emptyBytes
        });
        Call[] memory calls = new Call[](1);
        calls[0] = bnplCall;
        wallet.execute(calls);
    }
}
