// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./ComposooorRegister.sol";
import "./FakeKairos.sol";
import "./FlashLender.sol";
import "./IFlashBorrower.sol";
import "./MarketPlaceComposooored.sol";

contract BuyNowPayLaterBefore is IFlashBorrower, MarketPlaceComposooored {
    FakeKairos private kairos;
    FlashLender private flashLender;
    MarketPlace private market;
    IERC721 private nft;
    IERC20 private wEth; 

    constructor(
        FakeKairos _kairos,
        FlashLender _flashLender,
        MarketPlace _market,
        IERC721 _nft,
        IERC20 _wEth
    ) MarketPlaceComposooored(_market) {
        kairos = _kairos;
        flashLender = _flashLender;
        market = _market;
        nft = _nft;
        wEth = _wEth;
    }

    struct SaleOffer {
        IERC20 assetToReceive;
        IERC721 implem;
        address saleRecipient;
        uint tokenId;
        uint price;
        uint256 expirationDate;
        uint256 referralId;
    }

    struct LoanOffer {
        IERC20 assetToLend;
        uint256 loanToValue;
        uint256 duration;
        uint256 expirationDate;
        uint256 tranche;
        IERC721 implem;
        uint256 tokenId;
    }

    function buyNowPayLater(
        SaleOffer memory saleOffer,
        bytes memory saleOfferSignature,
        LoanOffer memory loanOffer,
        bytes memory loanOfferSignature
    ) external {
        flashLender.flashBorrow(
            1 ether,
            abi.encode(
                msg.sender,
                nft,
                1,
                saleOffer,
                saleOfferSignature,
                loanOffer,
                loanOfferSignature
            )
        );
    }

    function flashCallback(bytes memory callbackData) external {
        (
            address initialMsgSender,
            IERC721 implem,
            uint tokenId,
            SaleOffer memory saleOffer,
            bytes memory saleSignature,
            LoanOffer memory loanOffer,
            bytes memory loanOfferSignature
        ) = abi.decode(
            callbackData, 
            (
                address,
                IERC721,
                uint,
                SaleOffer,
                bytes,
                LoanOffer,
                bytes
            )
        );
        wEth.approve(address(market), 1 ether);
        market.buy(saleOffer, saleSignature);
        nft.approve(address(kairos), 1);
        kairos.borrow(loanOffer, loanOfferSignature, 7 ether / 10);
        wEth.transferFrom(initialMsgSender, address(this), 3 ether / 10);
        wEth.approve(address(flashLender), 1 ether);
    }
}
