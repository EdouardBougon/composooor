import { useComposooor } from "@composooor/composooor";
import { useCallback } from 'react';
import { BuyNowPayLater__factory } from '@composooor/contract';
// import { ContractAddresses } from '../config/addresses/addresses';

const ButtonPay = () => {
  console.log('ButtonPay', import.meta.env.VITE_WALLET, import.meta.env.VITE_BUYNOWPAYLATER);

  useComposooor({
    scWalletAddr: import.meta.env.VITE_WALLET ?? '0x3aAde2dCD2Df6a8cAc689EE797591b2913658659' as `0x${string}`,
    address: import.meta.env.VITE_BUYNOWPAYLATER ?? '0xab16A69A5a8c12C732e0DEFF4BE56A70bb64c926' as `0x${string}`,
    abi: BuyNowPayLater__factory.abi,
    functionName: 'buyNowPayLater',
    args: [],
  });

  const onClick = useCallback(() => {
    console.log('onClick')
    // write?.()
  }, []);

  return <button onClick={onClick}>Pay</button>;
};

export default ButtonPay;
