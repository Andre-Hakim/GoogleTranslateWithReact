import React from 'react';
import './App.css';
import Translate from './Components/Translate'

function App() {
  return (
    <div className="App">
      <div className="trandslateContainer">
        {/* <div className="translateforms"> */}
          <Translate></Translate>
        {/* </div>*/}
      </div> 
    </div>
  );
}

export default App;
