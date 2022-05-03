import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Footer } from './containers';
import ToastService from '@/containers/System/Services/ToastService';
import PreloaderService from '@/containers/System/Services/Preloader';

import Routes from './Routes';
import { useSelector } from 'react-redux';

const App = () => { 

  const loadContent = useSelector(state => state.loadContent);
  
  return (
    <BrowserRouter>
      <main className="app-wrapper">
        <Header className="main-column" />
        <Routes className="main-column" />
        <Footer className="main-column" />

        <ToastService />
        
        {loadContent.loading && 
          <PreloaderService />
        }
        
      </main>
    </BrowserRouter>
);
}

export default App;
