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
    assets: [],
    pargs: []
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
    const aTableBody = document.getElementById("aTableBody")
    const assetAddress = document.getElementById("assetAddress")
    const contractSymbol = document.getElementById("contractSymbol")
    const assetAmountOrId = document.getElementById("assetAmountOrId")
    const assetTo = document.getElementById("assetTo")
    const assetType = document.getElementById("assetType")
    const selectFXNewPromise = document.getElementById("selectFXNewPromise")
    const delegateInput = document.getElementById("delegateInput")
    const mintPromiseButton = document.getElementById("mintPromiseButton")
    const signPromiseButton = document.getElementById("signPromiseButton")
    const promiseFXargs = document.getElementById("promiseFXargs")
    const startPTime = document.getElementById("startPTime")
    const endPTime = document.getElementById("endPTime")
    const mintPromiseCol = document.getElementById("mintPromiseCol")
    const getSoul = document.getElementById("getSoul")
    const rowDelegation = document.getElementById("rowDelegation")

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
    const PMinterface = state.PMinterface
    state.soulID = Number(soulID)
    
    if ( soulID == 0 ) {
        getSoul.classList.remove("d-none")
        rowDelegation.classList.add("d-none")
    } 

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
        <td><a class="liable-id" href="${getPMAddress[chainID].explorer}token/${state.PMaddress}?a=${pa.liableID}">${Number(pa.liableID)}</a></td>
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
        <button class="btn btn-info float-sm-end btn-burn" id="btnExecuteP" onclick="executePromise(${state.PIDs[countID-1]})">
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

async function mintPermanentRecordToken(){
    const tokenID = await state.PM.mintSoul().then((x)=>{
        console.log(x)
        connectStuff()
    }
    
    )
}


async function executePromise(promiseID) {
    const PM = state.PM
    const success = await PM.executePromise(promiseID);
    if(String(success)=="success") alert(`${promiseID} executed. w\ Much success!`)
}

async function getAllAssets() {
    const PM = state.PM
    const aID = await PM.assetsOf(state.currentAddress)
    state.aIDs = Number(aID)
    const provider =  new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    //// @dev error on interating burned asset
    aID.forEach( async (n) => {
        const a = await PM.getAssetByID(Number(n))
        if( ! a.tokenAddress == '0x0000000000000000000000000000000000000000') {
        const ABIS = [ERC20abi, ERC721abi]
        let type = Number(Number(a.assetType)) == 1 ? "ERC20" : "ERC271"
        let abi =  ABIS[Number(a.assetType-1)]

        let Tcontract = new ethers.Contract(a.tokenAddress, abi, provider)
        let namez = await Tcontract.name()
        let howMuch = Number(a.howMuch)
        aTableBody.innerHTML += `
            <td class="token-id">
                ${n}
            </td>
            <td class="type">
                ${type}
            </td>
            <td class="amount-a">
                ${ howMuch}
            </td>
            <td>
                ${namez}
            </td>
            <td>
                <button class="btn btn-info btn-burn" onclick="burnAsset(${Number(n)})">
                    Burn Asset
                </button>
            </td>

            `
        }
    })
}

async function burnAsset(id){
    const PM= state.PM
    const success = await PM.burnAsset(id, state.currentAddress);
    if (success) alert(`${id} asset burrrrnd`)
    
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






async function assetAddressChanged() {
    state.AssetType = assetType.value
}

async function asseetTypeChanged() {
    const provider =  new ethers.providers.Web3Provider(window.ethereum)
    state.AssetType = assetType.value
    console.log(state.AssetType)
    let Asset;
    let value = assetAddress.value
    if (value.length == 42) {
        if (Number(state.AssetType) == 1 ) {
            Asset = new ethers.Contract(value, ERC20abi, provider)
        } else {
            Asset = new ethers.Contract(value, ERC721abi, provider)
        }
        console.log(Asset, 'vvvvvv')
        state.assetAddress = value;
        let name = await Asset.symbol()
        contractSymbol.innerText = name
    } else {
        contractSymbol.innerText = "Asset Name"
    }
}

async function assetCreateSubmit() {
    console.log("submitted create asset with values:",state.assetAddress, state.AssetType,state.newAssetAmt,state.assetToValue )
    let  assetTo = state.assetToValue ? state.assetToValue : "0x0000000000000000000000000000000000000000"

    let success
    const PM= state.PM
    // (address contract_, uint8 assetType, uint256 howmuch_, address to_)
    if (state.assetAddress == "0x0000000000000000000000000000000000000000") return alert('Asset cannotbe 0x0')
    
    try {
        success = await PM.makeAsset(state.assetAddress, state.AssetType, state.newAssetAmt, assetTo);
        
    } catch {
        alert(`transaction failed, token approval missing for PMmonster ${state.PMaddress}`)
    }
    if (success) alert(` asset created`)

    /// validate


}


function assetAmtIdChanged() {
    state.newAssetAmt = assetAmountOrId.value;
}

function assetToChanged() {
    if (assetTo.value.length == 42) {
        state.assetToValue = assetTo.value
    } else {
        state.assetToValue = "0x0000000000000000000000000000000000000000"
    }
}


////// make promise space

async function createPromiseFXchanged(){

    if ( selectFXNewPromise.value != '0') {
        let x = 0
        let args = selectFXNewPromise.value.split("(")
        state.currentFunction = args[0]
        args = args[1].slice(0,-1).split(",")
        state.currentArgs = args.map(s => String(s))
        promiseFXargs.innerHTML = ''
        args.forEach((a) => {
            promiseFXargs.innerHTML += `  <input type="text" class="form-control" id="${x}" placeholder="${a}" onchange="onChageParg(${x})">`
            x++
        })
    }
    const PM = state.PM
    const provider =  new ethers.providers.Web3Provider(window.ethereum)

    let delegate = delegateInput.value.split("").includes(".") ? await provider.resolveName(delegateInput.value) : delegateInput.value
    //const digest = PM.getDelegationTypedDataHash(delegation)
    let domainHash = await PM.domainHash()
    console.log(domainHash, delegate)
    const digest = getDigest(delegate, domainHash)
    state.currentDelegate = delegate
    // state.currentDigest = digest

    /// show mint promise button

    const iMonster = state.PMabi

}

function onChageParg(argID) {
    state.pargs[argID] = document.getElementById(String(argID)).value
}

async function getDigest() {
    // let digestOutput =ethers.utils.solidityKeccak256(["string","bytes32","bytes32"],[
    //         "\x19\x01",
    //         dH,
    //         ethers.utils.keccak256(state.PMinterface._encodeParams(['bytes32','address','bytes32'],[ethers.utils.id("Delegation(address delegate,bytes32 authority)"),deleGaddr,"0x0000000000000000000000000000000000000000000000000000000000000000"]))])
    //     return digestOutput
    let delegation = {
        delegate: state.currentDelegate,
        authority: "0x0000000000000000000000000000000000000000000000000000000000000000"
    }

    state.currentDelegation = delegation
    let digest222 = await state.PM.getDelegationTypedDataHash(delegation);


}

async function signPromise() {
    console.log("hereeee")

    const provider =  new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()


    const types = {
        Delegation: [
            { name: 'delegate', type: 'address' },
            { name: 'authority', type: 'bytes32' }
        ]
    };

    const domain = {
        name: "Promise.Monster",
        version: "1",
        chainId: sessionStorage.chainID,
        verifyingContract: state.PMaddress
    };


    let signature = await signer._signTypedData(domain, types, state. );
    state.currentSignature  = signature
    /// @dev redo and use signTypedData 
    // let signed = await signer.signMessage(state.currentDigest) //684e7d ///cea5ea
    // state.currentSignature =  ethers.utils.arrayify(signed)
    mintPromiseCol.classList.remove('d-none')
    mintPromiseButton.classList.remove('d-none')
    signPromiseButton.classList.add('d-none')
    
    // let delegation = {
    //     delegate: state.currentDelegate,
    //     authority: "0x0000000000000000000000000000000000000000000000000000000000000000"
    // }

    let signedDelegation = {
        delegation: state.currentDelegation,
        signature: state.currentSignature
    }


    state.currentSignedDelegation = signedDelegation
    state.currentCallData = state.PMinterface.encodeFunctionData(state.currentFunction,state.pargs)
    let start = Date.now() + Number(startPTime.value)
    state.currentStartEnd = [Number(start), Number(start) + Number(endPTime.value)]
    
    //// disable promise fields on sign
    /// add refresh button

    let currentPromise = [state.currentSignedDelegation, state.currentDelegate, state.currentCallData, state.currentStartEnd]
    state.currentPromise = currentPromise
    console.log(currentPromise)
    console.log(await state.PM.verifyDelegationSignature(state.currentSignedDelegation))
    }



async function mintPromise() {

        // let calldata = iMonster.encodeFunctionData
    // struct Delegation {
    //     address delegate;
    //     bytes32 authority;
    // }

    // struct SignedDelegation {
    //     Delegation delegation;
    //     bytes signature;
    // }

    // function mintPromise(
    //     SignedDelegation memory delegation_,
    //     address to_,
    //     bytes memory callData_,
    //     uint256[2] memory times_
    // )

     const submitPromise = await state.PM.mintPromise(state.currentSignedDelegation, state.currentDelegate, state.currentCallData, state.currentStartEnd)
     state.submittedPromise = submitPromise
     console.log("promise submitted")

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
    currentAddress.innerText = "|   🏩: " + sessionStorage.getItem('currentAccount')
    disconnectBtn.classList.remove('d-none')
    await setPMcontract();
    const PMinterface = new ethers.utils.Interface(PMabi)
    state.PMinterface = PMinterface
    const allFunctions = Object.keys(state.PMinterface.functions)
    allFunctions.forEach((f) => {
        if (['makeAsset(address,uint8,uint256,address)','ownerOf(uint256)', 'burnAsset(uint256,address)','safeTransferFrom(address,address,uint256)'].includes(f)) {
            selectFXNewPromise.innerHTML += `<option value="${f}">${f}</option>`
        } else {
            selectFXNewPromise.innerHTML += `<option value="${f}" disabled>${f}</option>`
        }        
    })
    state.hasSignedPromise = false
    await fetchPromises();
    await getAllAssets();
    
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
