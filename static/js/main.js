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
    const exePromisePlace = document.getElementById("exePromisePlace")
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
    const soulID = await PM.getSoulID(state.currentAddress)
    const PMinterface = new ethers.utils.Interface(PMabi)


    state.soulID = Number(soulID)
    let hasOrIsPromised = await PM.getPIDS(state.currentAddress)
    let PIDs = hasOrIsPromised.map(i => Number(i))
    let chainID = sessionStorage.getItem("chainID")
    let promises = await PM.getLiabilitiesAssetsFor(state.currentAddress)
    state.PIDs = PIDs.slice(1) //rm soul
    
    state.Passets=[]
    state.liabilities=[]
    let countID = 0
    promises['Pa'].forEach( async (pa) =>
    {
        if (pa.claimOwner == state.currentAddress && pa.state == 1) {
            state.Passets.push(pa)
            const func = PMinterface.getFunction(pa.callData.slice(0,10))
            const funcName = func.name
            const funcArgs = PMinterface.decodeFunctionData(func.name, pa.callData)
            const FXargs = Object.entries(funcArgs).map(([key, value]) => `${key}: ${value}`)
            const FXA = FXargs.slice(FXargs.length/2).join("<br/>");
    
        
            const paItem= `
        <tr>
        <td><a href="${getPMAddress[chainID].explorer}token/${state.PMaddress}?a=${pa.liableID}">${Number(pa.liableID)}</a></td>
        <td><span id="start">
            ${Date(Number(pa.times[0])).toLocaleString('en-US')}
        </span> <b> <hr> </b>
        <span id="end">
            ${Date(Number(pa.times[1])).toLocaleString('en-US')}
        </span> </td>
        <td class="funcName">${funcName}</td>
        <div class="overflow-auto">
        <td class="funcArgs">${FXA}</td>
        </div>
        <td id="exe-button">
        <button class="btn btn-info float-sm-end" id="btnExecuteP" onclick="executePromise(${state.PIDs[countID-1]})">
        execute
        </button>
        </td>
        </tr>
        `;
        console.log(countID);
        exePromisePlace.innerHTML += paItem
        countID++ /// @dev -1 
        } else {
            countID++ 
        }
    

    });

    promises['Pl'].forEach((pl) => {
        if(pl.liableID == state.soulID && state.soulID != 0) state.liabilities.push(pl)
    })
    soulSpan.innerHTML += `<a href="${getPMAddress[chainID].explorer}token/${state.PMaddress}?a=${PIDs[0]}" class="pill soul">${PIDs[0]}</a>`
    state.liabilities.slice(1).forEach((element, index) => {
        let pp = `<a href="${getPMAddress[chainID].explorer}token/${state.PMaddress}?a=${PIDs.slice(1)[index]}" class="badge badge-${stateColor[Number(element.state)]}">${PIDs.slice(1)[index]}</a>`
        pillContainer.innerHTML +=pp
    });
}


async function executePromise(promiseID) {
    const PM = state.PM
    const success = await PM.executePromise(promiseID);
    if(Boolean(success)) alert(`${promiseID} executed. w\ Much success!`)

}



async function setPMcontract() {
    const provider =  new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const PMaddress = sessionStorage.getItem('PMaddress')
    state.PMaddress = PMaddress
    const PM = new ethers.Contract(PMaddress, PMabi, signer)
    state.PM= PM;
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
    sessionStorage.clear()
    location.reload();
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

async function connectStuff() {
    activePage.classList.remove("d-none")
    landingPage.classList.add("d-none")
    monsterAddress.innerText = "|   👾: " + sessionStorage.getItem('PMaddress')
    currentAddress.innerText = "|   🧍: " + sessionStorage.getItem('currentAccount')
    disconnectBtn.classList.remove('d-none')
    await setPMcontract();
    await fetchPromises();
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

window.addEventListener('ready', async () => {
    btnExecuteP = document.getElementById("btnExecuteP")
});


