import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import  { getPMAddress } from '../context/NetworkContext';
import {useGlobalState} from "../context/GlobalState.js"

              
    function LoginBtnCol(props) {
        
        const [globalState, updateGlobalState] = useGlobalState();


        async function connectToMetamask(props) {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts", []);
            const chainId = await provider.chainId;
            const signer = provider.getSigner()

            const pmAddr = getPMAddress[parseInt(chainId)];
            
            console.log(accounts[0], pmAddr);
            
            updateGlobalState("currentAccount", accounts[0]);
            updateGlobalState("PMcontract", pmAddr);
            updateGlobalState("signer", signer);
            updateGlobalState("chainId", chainId);

            console.log(globalState.signer);
        }
    
    return(
        <div>
        {/* <div className='loginbtn-col' >
            <Button variant="outline-info btn-connect" onClick={loginQR} size="lg">QR Code Connect</Button>
        </div> */}
        <br />
        <div className='loginbtn-col' >
            <Button variant="outline-info btn-connect" onClick={connectToMetamask} size="lg">Browser Wallet Login</Button>
        </div>
        </div>
    );
    }
            


export default LoginBtnCol;