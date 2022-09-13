
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';

import { useGlobalState } from "../context/GlobalState.js"

              
    function TopBar(props) {
        
        const [globalState, updateGlobalState] = useGlobalState();
        
        
    
    return(
        <div className='row'>
            <br />
            <br />
            <div className='col-6'>

            </div>
            <div className='col-4'>
            <p> { sessionStorage.getItem("currentAccount") }</p>
            <p> { sessionStorage.getItem("PMaddress") }</p>
            </div>
            <br />
            <hr className="landing"/>
            <hr className="landing"/>
            <p> {props.promises}</p>
        </div>
    );
    }
            


export default TopBar;