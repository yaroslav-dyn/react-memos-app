import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Footer } from './containers';

import Routes from './Routes';


const App = () => (
  <BrowserRouter>
    <main className="app-wrapper">

      <Header className="main-column" />
      <Routes className="main-column" />
      <Footer className="main-column" />

    </main>

  </BrowserRouter>
);

export default App;
