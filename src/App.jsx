import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Footer } from './containers';
import ToastService from '@/containers/System/Services/ToastService';
import PreloaderService from '@/containers/System/Services/Preloader';

import Routes from './Routes';


const App = () => { 
  
  return (
    <BrowserRouter>
      <main className="app-wrapper">
        <Header className="main-column" />
        <Routes className="main-column" />
        <Footer className="main-column" />

        <ToastService />
        
        <PreloaderService />
        
      </main>
    </BrowserRouter>
);
}

export default App;
