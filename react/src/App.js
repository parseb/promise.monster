import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/LandingLogo';
import './components/LandingDescription';


import React, { useEffect } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import LandingLogo from './components/LandingLogo';
import LandingDescription from './components/LandingDescription';
import LandingParagraph from './components/LandingParagraph';
import  { getPMAddress } from './context/NetworkContext';
import { Button } from 'react-bootstrap';


function App() {
  useEffect(() => {
    document.title = 'promise 👾';
  });

    //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", /// from WC docs
  });

  const web3Provider = new providers.Web3Provider(provider);
  console.log(web3Provider);
  getPMAddress(web3Provider);
  return (
    <div className="App">
      <header className="App-header"> 
      </header>
        <div className='container main-container'>
          <br />
          <LandingLogo />
          <LandingDescription />
          <hr className="landing"/>
          <hr className="landing"/>
          <hr className="landing"/>
          <div className='row'>
            <div className='col-6'>
              <LandingParagraph />
            </div>
            <div className='col-6'>
              <Button variant="outline-info">Info</Button>{' '}
            </div>
          </div>
        </div>
      </div>

  );
}

export default App;
