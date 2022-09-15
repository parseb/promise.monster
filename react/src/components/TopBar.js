
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';

import { useGlobalState } from "../context/GlobalState.js"



              
    function TopBar(props) {
        const [globalState, updateGlobalState] = useGlobalState();
        
        function disconnect(){
            updateGlobalState("currentAccount", false);
            sessionStorage.clear("currentAccount");
            sessionStorage.clear("promises");
            /// handle this more gratiously
        }

    return(
        <div className='row'>
            <br />
            <br />
            <div className='col-1'>
            <br />
                <span className='current-address title2'>promise<span className='dot0dot'>.</span></span>
            <br />
                <hr className="landing-2"/>
                <span className='monster-address title2 monster'> <span className='dot0dot'>.</span>monster</span>
            </div>
            <div className='col-9'>
                <br />
                <span className='monster-address'>
                | 👾:{ sessionStorage.getItem("PMaddr") }
                </span>
                <br />
                <hr className="landing-2"/>
                <span className='current-address'>
                 |🧍:{ sessionStorage.getItem("currentAccount") } 
                </span>
            </div>
            <div className='col-2'>
                <Button variant="outline-secondary btn-disconnect" onClick={disconnect} size="lg">Disconnect</Button>
            </div>

            <br />
            <hr className="landing-2"/>
            <hr className="landing-2"/>
        </div>
    );
    }
            


export default TopBar;