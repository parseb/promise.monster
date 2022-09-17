"use strict"

// Unpkg imports
const Web3Modal = window.Web3Modal.default
const WalletConnectProvider = window.WalletConnectProvider.default
const evmChains = window.evmChains

let web3Modal
let provider
let selectedAccount

const stateColor = { 1: "light", 2: "success", 3: "danger", 4: "secondary" }
const state = {
    liabilities: [],
    assets: []
}

async function init() {
    const landingContainer = document.getElementById("landingContainer")
    const landingPage = document.getElementById("landingPage")
    const topContainer = document.getElementById("topContainer")
    const connectBtn = document.getElementById("connectBtn")
    const disconnectBtn = document.getElementById("disconnectBtn")
    const activePage = document.getElementById("activePage")

    const monsterAddress = document.getElementById("monsterAddress");
    const currentAddress = document.getElementById("currentAddress");
    const pillContainer = document.getElementById("pillContainer");
    const soulSpan = document.getElementById("soulSpan") 
    console.log("WalletConnectProvider is", WalletConnectProvider)
    console.log("window.ethereum is", window.ethereum)


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
    }

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    })

    console.log("Web3Modal instance is", web3Modal)
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchPromises() {
    const PM = state.PM
    console.log(PM)
    const soulID = await PM.getSoulID(state.currentAddress)

    state.soulID = Number(soulID)
    let hasOrIsPromised = await PM.getPIDS(state.currentAddress)
    let PIDs = hasOrIsPromised.map(i => Number(i))

    console.log(PIDs)
    let promises = await PM.getLiabilitiesAssetsFor(state.currentAddress)
    state.PIDs = PIDs
    state.assets=[]
    state.liabilities=[]
    promises['Pa'].forEach((pa) =>
    {
        if (pa.claimOwner == state.currentAddress) {
            state.assets.push(pa);
        }
    });

    promises['Pl'].forEach((pl) => {
        if(pl.liableID == state.soulID) state.liabilities.push(pl)
    })
    let chainID = sessionStorage.getItem("chainID")
    soulSpan.innerHTML += `<a href="${getPMAddress[chainID].explorer}token/${state.PMaddress}?a=${PIDs[0]}" class="pill soul">${PIDs[0]}</a>`
    state.liabilities.slice(1).forEach((element, index) => {
        let pp = `<a href="${getPMAddress[chainID].explorer}token/${state.PMaddress}?a=${PIDs.slice(1)[index]}" class="badge badge-${stateColor[Number(element.state)]}">${PIDs.slice(1)[index]}</a>`
        pillContainer.innerHTML +=pp
    });

    }


async function setPMcontract() {
    const provider =  new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const PMaddress = sessionStorage.getItem('PMaddress')
    state.PMaddress = PMaddress
    const PMread = new ethers.Contract(PMaddress, PMabi, signer)
    state.PM= PMread;
    state.currentAddress = sessionStorage.getItem('currentAccount')
    
}




async function submitTransaction() {

    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = ethersProvider.getSigner()
    let PMpost = new ethers.Contract(sessionStorage.getItem(PMaddress), PMabi, ethersProvider)

}


async function refreshAccountData() {

}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

    console.log("Opening a dialog", web3Modal)
    try {
        provider = await web3Modal.connect("fffff")
    } catch (e) {
        console.log("Could not get a wallet connection", e)
        return
    }
    if (provider) sessionStorage.setItem('provider', provider);


    const chainId = Number(provider.chainId)
    const ethereum = window.ethereum
    const web3 = new Web3(ethereum)
    const accounts = await web3.eth.getAccounts()
    state.chainId = chainId


    if (accounts[0]) {
        sessionStorage.setItem('chainID', chainId)
        sessionStorage.setItem('PMaddress', getPMAddress[chainId].contract)
        sessionStorage.setItem('currentAccount', accounts[0])
        sessionStorage.setItem('PMAddress', getPMAddress[chainId].contract)

        connectStuff();
 
    } else {
        console.log("connection failed")
    }

    //   fetchAccountData()
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
        // fetchAccountData()
    })

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        // fetchAccountData()
    })

    // Subscribe to networkId change
    provider.on("networkChanged", (networkId) => {
        // fetchAccountData()
    })

    //   await refreshAccountData()
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {
    console.log(Web3Provider)
    const provider = sessionStorage.getItem('provider')
    console.log("Killing the wallet connection", provider)

    // TODO: Which providers have close method?
    if (provider.close) {
        let p = await web3Modal.connect()
        await provider.close()

        // If the cached provider is not cleared,
        // WalletConnect will default to the existing session
        // and does not allow to re-scan the QR code with a new wallet.
        // Depending on your use case you may want or want not his behavir.
        await web3Modal.clearCachedProvider()
        provider = null
        disconnectStuff();

    }

    selectedAccount = null
    sessionStorage.clear('currentAccount')
}

function connectStuff() {
    activePage.classList.remove("d-none")
    landingPage.classList.add("d-none")
    monsterAddress.innerText = "|   👾: " + sessionStorage.getItem('PMaddress')
    currentAddress.innerText = "|   🧍: " + sessionStorage.getItem('currentAccount')
    disconnectBtn.classList.remove('d-none')
    setPMcontract();
    fetchPromises();
}

function disconnectStuff() {
    sessionStorage.clear()
    activePage.classList.add("d-none")
    landingPage.classList.remove("d-none")
    disconnectBtn.classList.add('d-none')
}

window.addEventListener('load', async () => {


    if (!sessionStorage.getItem('currentAccount')) {
        disconnectStuff()
    } else {
        connectStuff()
    }
    init()
    // connectBtn.addEventListener("click", onConnect)
    disconnectBtn.addEventListener("click", onDisconnect)

})


