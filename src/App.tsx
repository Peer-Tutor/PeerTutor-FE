import React from 'react';
import RouteConfig from './components/RouteConfig/RouteConfig';
import { BrowserRouter } from 'react-router-dom';
import './Global.css';
import './PrimeReact.css';


function App() {
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}

export default App;
