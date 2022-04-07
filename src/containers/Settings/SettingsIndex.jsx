import React from 'react';
// eslint-disable-next-line import/extensions
import Profile from '@/containers/Settings/parts/Profile';
import '@/scss/Settings.scss';

const SettingsIndex = () => {

  return (
    <main className="container main_area main-column">
      <section className="section_item">
        <article>
         <Profile />
        </article>
      </section>
    </main>
  )
};

export default SettingsIndex;