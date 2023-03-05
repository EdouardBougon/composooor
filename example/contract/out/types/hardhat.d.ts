/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "BuyNowPayLater",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BuyNowPayLater__factory>;
    getContractFactory(
      name: "ComposooorRegister",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ComposooorRegister__factory>;
    getContractFactory(
      name: "FakeKairos",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FakeKairos__factory>;
    getContractFactory(
      name: "FlashLender",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FlashLender__factory>;
    getContractFactory(
      name: "IFlashBorrower",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFlashBorrower__factory>;
    getContractFactory(
      name: "MarketPlace",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MarketPlace__factory>;
    getContractFactory(
      name: "MarketPlaceComposooored",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MarketPlaceComposooored__factory>;
    getContractFactory(
      name: "MockNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockNFT__factory>;
    getContractFactory(
      name: "MockWeth",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockWeth__factory>;
    getContractFactory(
      name: "SmartContractWallet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SmartContractWallet__factory>;

    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "BuyNowPayLater",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BuyNowPayLater>;
    getContractAt(
      name: "ComposooorRegister",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ComposooorRegister>;
    getContractAt(
      name: "FakeKairos",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FakeKairos>;
    getContractAt(
      name: "FlashLender",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FlashLender>;
    getContractAt(
      name: "IFlashBorrower",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFlashBorrower>;
    getContractAt(
      name: "MarketPlace",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MarketPlace>;
    getContractAt(
      name: "MarketPlaceComposooored",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MarketPlaceComposooored>;
    getContractAt(
      name: "MockNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockNFT>;
    getContractAt(
      name: "MockWeth",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockWeth>;
    getContractAt(
      name: "SmartContractWallet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SmartContractWallet>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}