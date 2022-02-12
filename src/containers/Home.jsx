import React from 'react';
const greetingMessage = true;
import {
  Link
} from "react-router-dom";

const Home = () => (

  <main className="main_area main-column">

  <article>

      {greetingMessage 
        ? <h1> Hi Memo!</h1>
        : <h1> Good buy Memo! </h1>
      }
 
      <Link
        className="action-btn mobile100 add_btn"
        to="/memos">
        Go to Memo
      </Link>
    

  </article>

  </main>

);

export default Home;
