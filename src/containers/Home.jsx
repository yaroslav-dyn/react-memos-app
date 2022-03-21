import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '@/scss/home.scss'

const greetingMessage = true;
import {
  Link
} from 'react-router-dom';

const Home = () => (

  <main className="container main_area main-column">

    <article className="greeting-block">
      {greetingMessage
        ?
        <>
          <h1 className="centered-text greeting-heading"> Hi memorian!
            <br /> Do you want to jump into a magic world ?
          </h1>
          <p className="centered-text greeting-text">Please login and let's start</p>

          <TransitionGroup
            className="todo-list"
          >
            <CSSTransition
              timeout={500}
              classNames="item"
            >
              <div className="greeting-preview">
                <ul className="greeting-preview__list">
                  <li className="greeting-preview__list--item">
                    <span>Investigate</span>
                    <i className="material-icons">lightbulb</i>
                  </li>
                  <li className="greeting-preview__list--item">
                    <span>Dream</span>
                    <i className="material-icons">cloud</i>
                  </li>
                  <li className="greeting-preview__list--item">
                    <span>Systematize</span>
                    <i className="material-icons">library_books</i>
                  </li>
                </ul>
              </div>
            </CSSTransition>
          </ TransitionGroup>
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
