import { useState } from 'react';

export const Home = () => {
  const [cosmosAddress, setCosmosAddress] = useState('');

  const buttonHandlerKeplrConnect = async () => {
    if (window.keplr) {
      const chainId = 'cosmoshub-4';
      await window.keplr.enable(chainId);

      const offlineSigner = await window.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts();

      setCosmosAddress(keplrAccounts[0].address);
    } else {
      alert('Keplr extension is not installed.');
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="flex flex-col text-white">
        {!cosmosAddress && (
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={buttonHandlerKeplrConnect}
          >
            Connect wallet
          </button>
        )}
        {cosmosAddress && <p>{cosmosAddress} connected</p>}
      </div>
    </div>
  );
};

export default Home;
