import { Badge, Button, Card, ListGroup } from 'react-bootstrap';
import { ethers, Contract, utils } from 'ethers';
import  { getPMAddress, PMabi } from '../context/NetworkContext';
import React from 'react';
import TopBar from "./TopBar";

              
    class MainComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                currentAccount: sessionStorage.currentAccount,
                PMaddr: sessionStorage.PMaddr,
                promises:[],
                assets: sessionStorage.assets,
                liabilities: sessionStorage.liabilities || [],
                currentSoul: sessionStorage.soulID,
                promiseIDS: [],
                badgeData:[],
                colors :{1:"light", 2:"success", 3:"danger", 4:"secondary" }

            }

            this.promisesLists = this.promisesLists.bind(this);
            //this.lifetimePills = this.lifetimePills.bind(this);
        }
        
        async componentDidMount() {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // const accounts = await provider.send("eth_requestAccounts", []);
            const network = provider.getNetwork();
            const chainId = network.chainId;
            // const signer = provider.getSigner()
            const PMaddr = getPMAddress[chainId];
            const PMread = new Contract(
                sessionStorage.PMaddr,
                PMabi,
                provider
                );
            
            try {
                const promises = await PMread.getPromiseHistory(sessionStorage.currentAccount);
                const response = await PMread.getLiabilitiesAssetsFor(sessionStorage.currentAccount);
                console.log(promises);
                sessionStorage.setItem('promises', promises);
                sessionStorage.setItem('liabilities', response.Pl);
                sessionStorage.setItem('assets', response.Pa);

                    //  struct Promise {
                    //     Standing state;
                    //     /// lifecycle state
                    //     uint256 liableID;
                    //     /// liable soul
                    //     address claimOwner;
                    //     /// creditor
                    //     uint256[2] times;
                    //     /// executable within timeframe [starting with | until].
                    //     SignedDelegation delegation;
                    //     /// signed delegation
                    //     bytes callData;
                    // }
                    const soul = await PMread.getSoulID(this.state.currentAccount);
                    const hasOrIsPromised = await PMread.getPIDS(this.state.currentAccount);
                    const pIDS = await hasOrIsPromised.slice(1);
                    const soulID = Number(soul)

                    this.setState({
                        // liabile: response['Pl'].map((X)=> Object.fromEntries(X.entries())),
                        // liabile: response['Pl'],
                        // owed: response['Pa'],
                        currentSoul: soulID,
                        promises: [...promises],
                        hasOrIsPromised: [...hasOrIsPromised],
                        pIDS: [...pIDS],
                    })

                    const badgeData = []
                    for (let i=0; i < this.state.promises.length; i++) {
                        let p = this.state.promises[i];
                        if (p.state == 0) continue;
                        if (Number(p.liableID) == this.state.currentSoul) {
                            badgeData.push([Number(p.state),Number(this.state.pIDS[i])]);
                            }
                        }
                    
                        this.setState({
                            badgeData: [...badgeData]
                        })


               sessionStorage.setItem('soulID', soulID);


            } catch (err){
                console.log(err);
            }
            

        }
        // enum Standing {
        //     Uninitialized, -0
        //     Created, - 1 
        //     Honored, - 2
        //     Broken, - 3
        //     Expired -4 
        // }

    
        promisesLists() {
            const liabilities = []
            const assets = []
            
            for (let i=0; i < this.state.promises.length; i++) {
                let p = this.state.promises[i];
                let lid = Number(p.liableID);
                console.log(lid, Number(sessionStorage.soulID), 'liabilities if equal')
                if(lid == sessionStorage.soulID ) {
                    liabilities.push(<p className='liability' key={i}> {String(p.claimOwner)} </p>)
                    
                } else if (String(p.claimOwner) == String(localStorage.currentAccount)) {
                    
                    assets.push(<p className='asset' key={i}> {String(p.claimOwner)} </p>);
                }
                
            }
        return  <div><div> {liabilities} </div><div> { assets }</div></div>
        }




        render() {


            // console.log(liabilities);
            // this.setState({liabilities: liabilities});


            return (
    <div className='container'>
        <TopBar />  
        <br />        
      <hr />
      <div className="row row-soul">
        <Card body >
            <div className="row">
                <div className='col-2 age-title'>
                    Life: 
                </div>
                <div className='col-10 record-pills'>
                { this.state.badgeData.map((val,index) => {
                   return <Badge className='pill-soul' pill bg={this.state.colors[2]} key={index}>{val[0]}</Badge>
                }) }
                
                </div>
            </div>
        </Card>
      </div>
      <hr />
      <hr />
      <div className='row row-visualsoul'>
            <div className='row row-pannels'>
            { this.promisesLists() }
          <hr />
        </div>
    </div>
    </div>
            );
        }
       
    }
            


export default MainComponent;