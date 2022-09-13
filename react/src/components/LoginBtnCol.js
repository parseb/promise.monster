import { Button, ListGroup } from 'react-bootstrap';
import { ethers } from 'ethers';
import  { getPMAddress } from '../context/NetworkContext';
import { useGlobalState } from "../context/GlobalState.js"

              
    function LoginBtnCol(props) {
        
        const [globalState, updateGlobalState] = useGlobalState();


        async function connectToMetamask(props) {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts", []);
            const network = await provider.getNetwork();
            const chainId = network.chainId;
            const signer = provider.getSigner()

            const pmAddr = getPMAddress[parseInt(chainId)];
            
            console.log(accounts[0], pmAddr);
            
            updateGlobalState("currentAccount", accounts[0]);
            updateGlobalState("PMaddr", pmAddr);
            updateGlobalState("signer", signer);
            updateGlobalState("chainId", chainId);
            
        }
    
    return(
        <div>
            <div>
            <h4 className='functionality-list-title'>
                Some of the Features: 
            </h4>
            <br />
                <ul className='functionality-list-itmes'>
                    <li>Liable entities carry reputation under the form of a address-bounded token</li>
                    <li>Promises are transferable ERC721s and refer to timeframe specific or not future transactions</li>
                    <li>Promises can be made with respect to any asset. Internally an asset is an ERC721  that wraps any other given ERC721 or ERC20 asset.</li>
                    <li><b>To recap:</b> Promises are NFTs, mostly delegations of future claims to any wrapped arbitrary asset. They are transferable and potentially valuable.</li>
                </ul>
            
            </div>
        <br />
        <div className='loginbtn-col' >
            <Button variant="outline-secondary btn-connect" onClick={connectToMetamask} size="lg">Browser Wallet Login</Button>
        </div>
        </div>
    );
    }
            


export default LoginBtnCol;