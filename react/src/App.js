import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import React, { useEffect } from 'react';
import LandingApp from './components/LandingApp';

import {useGlobalState} from "./context/GlobalState.js"


function App(props) {
  useEffect(() => {
    document.title = 'promise 👾';
  });

  const [globalState, updateGlobalState] = useGlobalState();




  if (globalState.currentAccount) { 
    return (
      <p> { globalState.currentAccount }</p>
    )
  } else {
    return (
      <LandingApp />
    );
  }
}

export default App;
