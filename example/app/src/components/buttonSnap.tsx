import { useContext, useState } from "react";
import { useAccount } from 'wagmi';
import { useWalletAddress } from '../config/address';
import { MetamaskActions, MetaMaskContext } from '../snap/context';
import {
  connectSnap,
  getSnap,
  buyNowPayLater,
} from '../snap/utils';


export interface ButtonPaySnapProps {
  addLog: (log: string) => void;
  resetLogs: () => void;
}

const ButtonPaySnap = ({ addLog, resetLogs }: ButtonPaySnapProps) => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [isSuccess, setIsSucess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { address } = useAccount();
  const { buyNowPayLaterAddress, scWalletAddress } = useWalletAddress()

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleSendHelloClick = async () => {
    if (address === undefined) {
      return;
    }

    try {
      resetLogs();
      addLog('Sending transaction to Metamask Snap');
      await buyNowPayLater(address, buyNowPayLaterAddress, scWalletAddress);
      addLog('Transaction executed with success');
      setIsSucess(true);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
      addLog('Transaction Error');
      setIsError(true);
    }
  };

  return (
    <>
      {!state.installedSnap && (
        <button
          disabled={!state.isFlask}
          onClick={handleConnectClick}
          className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg"
        > Connect Snap </button>
      )}

      {state.installedSnap && !isSuccess && !isError && (
        <button
          disabled={!state.isFlask}
          onClick={handleSendHelloClick}
          className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg"
        > Buy </button>
      )}

      {isSuccess && !isError && (
        <button
          disabled={true}
          onClick={handleSendHelloClick}
          className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg"
        > Transaction success! </button>
      )}

      {!isSuccess && isError && (
        <button
          disabled={true}
          onClick={handleSendHelloClick}
          className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg"
        > Transaction error! </button>
      )}
    </>
  );
};

export default ButtonPaySnap;
