import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import React, { useEffect } from 'react';
import LandingApp from './components/LandingApp';
import MainComponent from './components/MainComponent';
import {useGlobalState} from "./context/GlobalState.js"


function App(props) {
  useEffect(() => {
    document.title = 'promise 👾';
  });

  const [globalState, updateGlobalState] = useGlobalState();




  if (sessionStorage.currentAccount) { 
    return (
      <div className='container'>
        <MainComponent />
      </div>
    )
  } else {
    return (
      <LandingApp />
    );
  }
}

export default App;
