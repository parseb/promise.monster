import { Button } from 'react-bootstrap';
import { ethers, Contract, utils } from 'ethers';
import  { getPMAddress, PMabi } from '../context/NetworkContext';
import React from 'react';
import TopBar from "./TopBar";

              
    class MainComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                currentAccount: sessionStorage.currentAccount,
                promises:[]
            }
        }
        

        render() {

    
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // const accounts = await provider.send("eth_requestAccounts", []);
            const network = provider.getNetwork();
            const chainId = network.chainId;
            // const signer = provider.getSigner()
            const PMaddr = getPMAddress[5];
            const PMread = new Contract(
                sessionStorage.PMaddr,
                PMabi,
                provider
              );
            
            PMread.getLiabilitiesAssetsFor(sessionStorage.currentAccount)
                .then((response) => {
                  sessionStorage.setItem('promises', [response]);
                  console.log(response);
                });

            return (
                <>
        <TopBar pros={this.state.promises}/>
        <div className='row'>
         <p>
    
        </p> 

        </div>
        </>
            );
        }
       
    }
            


export default MainComponent;