import { Button } from 'react-bootstrap';
import { ethers, Contract, utils } from 'ethers';
import { useGlobalState } from "../context/GlobalState.js"
import  { getPMAddress, PMabi } from '../context/NetworkContext';

import TopBar from "./TopBar";
import { useEffect, useState } from 'react';

              
    function MainComponent(props) {
        
        const [globalState, updateGlobalState] = useGlobalState();
        const [promises, setPromises] = useState([]);

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const accounts = await provider.send("eth_requestAccounts", []);
        const network = provider.getNetwork();
        const chainId = network.chainId;
        // const signer = provider.getSigner()
        const PMaddr = getPMAddress[5];
        
        console.log(PMaddr);
        // const PMread = new ethers.Contract(
        //     sessionStorage.PMcontract,
        //     PMabi,
        //     provider
        // );

        useEffect( () => {
            const contract = new Contract(
                sessionStorage.PMaddr,
                PMabi,
                provider
              );
            contract.getLiabilitiesAssetsFor(sessionStorage.currentAccount)
              .then(response => JSON.stringify(response))
              .then((response) => updateGlobalState('promises', response));
              console.log(promises);
  
         
        })

        // const fetchPromises = async () => {
        //     const promises = await UserPromises(
        //         provider,
        //         sessionStorage.currentAccount,
        //         PMaddr
        //     )
        //         console.log("this gets executed");
        //     if (promises) {
        //       updateGlobalState('promises', promises);
        //       console.log(promises);
        //     } else {
          
        //     }
        //   };
        //   fetchPromises();

    return(
        <>
        <TopBar promises= {globalState.promises}/>
        <div className='row'>
         <p>
    
        </p> 

        </div>
        </>
    )
    }
            


export default MainComponent;