import React from 'react';
import RouteConfig from './components/RouteConfig/RouteConfig';
import { BrowserRouter } from 'react-router-dom';
import './Global.css';
import './primeng-style/Button.css';

import axiosInterceptor from './utils/axiosInterceptor';

function App() {
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}

export default App;
