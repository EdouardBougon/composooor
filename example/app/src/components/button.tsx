import { useComposooor } from "@composooor/composooor";
import { useCallback } from 'react';
import { BuyNowPayLater__factory, ComposooorRegister__factory } from '@composooor/contract';
import { BuyNowPayLater } from '@composooor/contract';
import { BigNumber, Contract } from 'ethers';
import { CallStructOutput } from '@composooor/contract/out/types/contracts/SmartContractWallet';
import { defaultAbiCoder, FormatTypes } from 'ethers/lib/utils.js';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { SmartContractWallet__factory } from '@composooor/contract';
// import { ContractAddresses } from '../config/addresses/addresses';

export type PrefixifyBy0x<T> = T extends string
  ? prefixedBy0x
  : T extends BigNumber
  ? T
  : T extends object
  ? {
      [k in keyof T]: PrefixifyBy0x<T[k]>
    }
  : T

type Call = PrefixifyBy0x<Omit<CallStructOutput, keyof [string, string, string]>>
const abiCoder = defaultAbiCoder
const emptyBytes = '0x'
type prefixedBy0x = `0x${string}`

function extractErrorHex(error: Error){
  let str = "0x"
  if (error){
    if (error.message) {
      const message = error.message 
      let match = message.match(/error={.*}/g)
      if(match) {
        str = match[0]
        if (str.match(/"data":{.*}/g)){
          str = (str.match(/"data":{.*}/g) as Array<string>)[0]
          str = (str.match(/0x[0-9a-f]*/g) as Array<string>)[0]
        }
      }
    }
  }
  return str
}

function getPrepValues(error: Error) {
  const MissingDataSigHash = "0xab3e92cf"
  const errorHex = extractErrorHex(error)
  const foundSelector = errorHex.slice(0,10);
  const abiEncodedErrorData = "0x".concat(errorHex.substring(10))
  if (foundSelector === MissingDataSigHash) {
    const decoded = abiCoder.decode(["address", "string", "bytes"], abiEncodedErrorData)
    return {needsPrep: true, address: decoded[0], url: decoded[1], argsBytes: decoded[2]}
  } else {
    return {needsPrep: false, error: error}
  }
}

function useMyComposooor(contract: Contract, funcName: string, args: Array<any>) {
  const scWalletAddr = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'

  const calls: Call[] = [
    {
      callee: contract.address as prefixedBy0x,
      functionSelector: contract.interface.getSighash(funcName) as prefixedBy0x,
      data: emptyBytes
    }
  ]

  const {config, error} = usePrepareContractWrite({
    address: scWalletAddr,
    abi: SmartContractWallet__factory.abi,
    functionName: 'execute',
    args: [calls]
  })

  if (error) {
    const prep = getPrepValues(error)
    if (prep.needsPrep) {
      
    }
  }

  const { write } = useContractWrite(config)
  return { write }
}

const ButtonPay = () => {
  // console.log('ButtonPay', import.meta.env.VITE_WALLET, import.meta.env.VITE_BUYNOWPAYLATER);

  const bnplIface = BuyNowPayLater__factory.createInterface()
  const {write} = useMyComposooor(
    BuyNowPayLater__factory.getContract('0x0165878A594ca255338adfa4d48449f69242Eb8F',bnplIface),
    'buyNowPayLater', [])

  // useComposooor({
  //   scWalletAddr: import.meta.env.VITE_WALLET ?? '0x3aAde2dCD2Df6a8cAc689EE797591b2913658659' as `0x${string}`,
  //   address: import.meta.env.VITE_BUYNOWPAYLATER ?? '0xab16A69A5a8c12C732e0DEFF4BE56A70bb64c926' as `0x${string}`,
  //   abi: BuyNowPayLater__factory.abi,
  //   functionName: 'buyNowPayLater',
  //   args: [],
  // });

  const onClick = useCallback(() => {
    // console.log('onClick')
    write?.()
  }, []);

  return <button onClick={onClick}>Pay</button>;
};

export default ButtonPay;
