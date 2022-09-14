
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';

import { useGlobalState } from "../context/GlobalState.js"

              
    function TopBar(props) {
        

    return(
        <div className='row'>
            <br />
            <br />
            <div className='col-3'>

            </div>
            <div className='col-3'>
             { sessionStorage.getItem("currentAccount") } 

             { sessionStorage.getItem("PMaddr") }

            

            </div>
            <div className='col-3'>
            </div>

            <br />
            <hr className="landing"/>
            <hr className="landing"/>
        </div>
    );
    }
            


export default TopBar;