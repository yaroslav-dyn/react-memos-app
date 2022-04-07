import React from 'react';
import Profile from '@/containers/Settings/parts/Profile';
import '@/scss/settings.scss';

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