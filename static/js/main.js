"use strict";

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;

let web3Modal;
// Chosen wallet provider given by the dialog window
let provider;
// Address of the selected account
let selectedAccount;


const state = {
  provider: null,
  web3: null,
  PMcontract: null,
  signer: null,
  liabilities: [],
  assets: [],
}

const landingContainer = document.getElementById("landingContainer")
const connectBtn = document.getElementById("connectBtn") 
const disconnectBtn = document.getElementById("disconnectBtn")

function init() {

  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log( "window.ethereum is", window.ethereum);
  const ethereum = window.ethereum;
  const web3 = new Web3(provider);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "",
        rpc: {
            1: "https://cloudflare-eth.com",
            5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            420: "https://goerli.optimism.io",
            42161: "https://rpc.ankr.com/arbitrum",
            421611: "https://rinkeby.arbitrum.io/rpc",
            136: "https://polygon-rpc.com",
            80001: "https://matic-mumbai.chainstacklabs.com"
        }
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchPromises() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);
  console.log("Web3 instance is", web3);

 
}


async function setPMcontract() {
  const PM =  new state.web3.eth.Contract(PMabi, sessionStorage.getItem(PMaddress));
  state.PM = await PM;
  return PM;
}




async function submitTransaction(){

  const ethersProvider =  new ethers.providers.Web3Provider(window.ethereum) 
  let signer = ethersProvider.getSigner();
  let PMpost = new ethers.Contract(sessionStorage.getItem(PMaddress), PMabi, ethersProvider);

}


async function refreshAccountData() {

}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {



  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  state.provider = provider; 
  const chainId = Number(provider.chainId)

  if (provider != null ) { 
    sessionStorage.setItem('chainID', chainId);
    sessionStorage.setItem('PMaddress', getPMAddress[chainId]);
    console.log("")
} 

//   fetchAccountData()
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    // fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    // fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    // fetchAccountData();
  });

//   await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    let provider = await web3Modal.connect();
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;
}

window.addEventListener('load', async () => {
    init();
    // connectBtn.addEventListener("click", onConnect);
    // disconnectBtn.addEventListener("click", onDisconnect);
  });


