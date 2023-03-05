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
    function run() public {
        vm.startBroadcast();

        new BuyNowPayLater(
            FakeKairos(address(0)),
            FlashLender(address(0)),
            MarketPlace(address(0)),
            MockNFT(address(0)),
            MockWeth(address(0))
        );
    }
}
