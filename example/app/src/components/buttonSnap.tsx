import { PrefixedBy0x } from '@composooor/composooor';
import { useContext } from "react";
import { useAccount } from 'wagmi';
import { MetamaskActions, MetaMaskContext } from '../snap/context';
import {
  connectSnap,
  getSnap,
  buyNowPayLater,
} from '../snap/utils';

const ButtonPaySnap = () => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const { address } = useAccount();

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
      await buyNowPayLater(address);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
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

      <button
        disabled={!state.isFlask}
        onClick={handleConnectClick}
        className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg"
      > Dev: ReConnect Snap </button>

      {state.installedSnap && (
        <button
          disabled={!state.isFlask}
          onClick={handleSendHelloClick}
          className="btn-2 btn text-lg px-3 py-2 mt-3 text-sm font-medium text-center rounded-lg"
        > Buy </button>
      )}
    </>
  );
};

export default ButtonPaySnap;
