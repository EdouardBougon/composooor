// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "forge-std/Test.sol";

import "../contracts/MockWeth.sol";
import "../contracts/BuyNowPayLater.sol";
import "../contracts/FlashLender.sol";
import "../contracts/MarketPlace.sol";
import "../contracts/MockNFT.sol";
import "../contracts/SmartContractWallet.sol";

contract TestFull is Test {
    uint testPKey = uint256(bytes32(hex"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"));
    MockWeth wEth;
    BuyNowPayLater buyNowPayLater;
    FakeKairos kairos;
    FlashLender flashLender;
    MarketPlace marketPlace;
    MockNFT nft;
    SmartContractWallet wallet;
    bytes emptyBytes;

    function setUp() public {
        address f39 = vm.addr(testPKey);
        vm.label(f39 , "F39");
        wEth = new MockWeth();
        kairos = new FakeKairos(wEth);
        flashLender = new FlashLender(wEth);
        marketPlace = new MarketPlace(wEth);
        nft = new MockNFT();
        wallet = new SmartContractWallet();
        buyNowPayLater = new BuyNowPayLater(kairos, flashLender, marketPlace, nft, wEth);
        nft.transferFrom(address(this), f39, 1);
        wEth.transfer(address(flashLender), 10 ether);
        wEth.transfer(address(wallet), 1 ether);
        wEth.transfer(address(kairos), 1 ether);
        vm.prank(f39);
        nft.approve(address(marketPlace), 1);
    }

    function testTmp() public {
        console.logBytes4(MissingOffchainDataError.selector);
    }

    function testFull() public {
        Call memory bnplCall = Call({
            callee: address(buyNowPayLater),
            functionSelector: buyNowPayLater.buyNowPayLater.selector,
            data: emptyBytes
        });
        SaleOffer memory saleOffer = SaleOffer({
                    implem: nft,
                    tokenId: 1,
                    price: 1 ether
                });
        Call memory registerCall = Call({
            callee: address(buyNowPayLater),
            functionSelector: buyNowPayLater.recordParameter.selector,
            data: abi.encode(
                abi.encode(
                    saleOffer,
                    genSignature(saleOffer)
                )
            )
        });
        Call memory approvalCall =  Call({
            callee: address(wEth),
            functionSelector: wEth.approve.selector,
            data: abi.encode(
                address(buyNowPayLater),
                uint256(1 ether)
            )
        });
        Call[] memory calls = new Call[](3);
        calls[0] = registerCall;
        calls[1] = approvalCall;
        calls[2] = bnplCall;
        wallet.execute(calls);
    }

    function genSignature(SaleOffer memory saleOffer) internal view returns(bytes memory) {
        bytes32 digest = keccak256(abi.encode(saleOffer));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(testPKey, digest);
        return bytes.concat(r, s, bytes1(v));
    }
}
