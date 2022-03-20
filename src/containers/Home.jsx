import React from 'react';
import '@/scss/home.scss'

const greetingMessage = true;
import {
  Link
} from 'react-router-dom';

const Home = () => (

  <main className="main_area main-column">

    <article className="greeting-block">
      {greetingMessage
        ? 
        <>
          <h1 className="centered-text greeting-heading"> Hi memorian! <br /> Do you want to jump into a magic world</h1>
          <p className="centered-text greeting-text">Please login and let's start</p>
        </> 
        : <h1 className="centered-text greeting-heading"> Good buy memorian! </h1>
      }
      <Link
        className="action-btn mobile100 add_btn"
        to="/login"
      >
        Enter the world
      </Link>


    </article>

  </main>

);

export default Home;
