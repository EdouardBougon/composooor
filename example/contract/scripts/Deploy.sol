// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "forge-std/Script.sol";

import "../contracts/MockWeth.sol";
import "../contracts/BuyNowPayLater.sol";
import "../contracts/FlashLender.sol";
import "../contracts/MarketPlace.sol";
import "../contracts/MockNFT.sol";
import "../contracts/SmartContractWallet.sol";

contract Deploy is Script {
    uint testPKey = uint256(bytes32(hex"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"));
    MockWeth wEth;
    BuyNowPayLater buyNowPayLater;
    FakeKairos kairos;
    FlashLender flashLender;
    MarketPlace marketPlace;
    MockNFT nft;
    SmartContractWallet wallet;
    bytes emptyBytes;

    function run() public {
        string memory toWrite = "";

        vm.startBroadcast(testPKey);
        address f39 = vm.addr(testPKey);
        vm.label(f39, "F39");
        wEth = new MockWeth();
        kairos = new FakeKairos(wEth);
        flashLender = new FlashLender(wEth);
        marketPlace = new MarketPlace(wEth);
        nft = new MockNFT();
        wallet = new SmartContractWallet();
        buyNowPayLater = new BuyNowPayLater(kairos, flashLender, marketPlace, nft, wEth);
        wEth.give(f39);
        wEth.transfer(address(flashLender), 10 ether);
        wEth.transfer(address(wallet), 1 ether);
        wEth.transfer(address(kairos), 1 ether);
        nft.approve(address(marketPlace), 1);
        // address(wallet).call(hex"472f07fe0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000165878a594ca255338adfa4d48449f69242eb8f1e56d5830000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000");
        vm.stopBroadcast();

        toWrite = addEnv(toWrite, "VITE_WETH", vm.toString(address(wEth)));
        toWrite = addEnv(toWrite, "VITE_BUYNOWPAYLATER", vm.toString(address(buyNowPayLater)));
        toWrite = addEnv(toWrite, "VITE_KAIROS", vm.toString(address(kairos)));
        toWrite = addEnv(toWrite, "VITE_FLASHLENDER", vm.toString(address(flashLender)));
        toWrite = addEnv(toWrite, "VITE_MARKETPLACE", vm.toString(address(marketPlace)));
        toWrite = addEnv(toWrite, "VITE_NFT", vm.toString(address(nft)));
        toWrite = addEnv(toWrite, "VITE_WALLET", vm.toString(address(wallet)));

        vm.writeFile("./deployment/.env", toWrite);
    }

    function addEnv(
        string memory written,
        string memory name,
        string memory const
    ) internal pure returns (string memory toWrite) {
        toWrite = string.concat(written, name);
        toWrite = string.concat(toWrite, "=");
        toWrite = string.concat(toWrite, const);
        toWrite = string.concat(toWrite, "\n");
    }
}
