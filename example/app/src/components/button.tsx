import { useComposooor } from "@composooor/composooor";
import { useCallback } from 'react';
import { ContractAddresses } from '../config/addresses/addresses';

const ButtonPay = () => {
  console.log('ButtonPay');

  useComposooor({
    scWalletAddr: ContractAddresses[31337].SmartContractWallet as `0x${string}`,
    address: ContractAddresses[31337].BuyNowPayLater as `0x${string}`,
    abi: [{
      "inputs": [],
      "name": "buyNowPayLater",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }],
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
