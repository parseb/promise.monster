import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useEffect } from 'react';
import Description from './components/Description';

function App() {
  useEffect(() => {
    document.title = 'promise 👾';
  });
  return (
    <div className="App">
      <header className="App-header"> 
      </header>
      <div className='container main-container'>
        <div className='row'>
        <div className='col-3'>
          </div>
          <div className='col-6'>
            <h2 className='logo-text text-center'>promise 👾 monster</h2>
          </div>
          <div className='col-3'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
