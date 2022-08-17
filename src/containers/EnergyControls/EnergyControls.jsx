import React, { useEffect, useState } from 'react';
import EnergyControlsService from '@/Scripts/Services/units/EControlsService';


const EnergyControls = () => {

  const [energyControls, setEnergyControls] = useState([]);

  const getEControls = () => {
    EnergyControlsService.getEnergyControls().then(response => setEnergyControls(response))
  }

  useState(()=> {
    getEControls();
  })

  return (
      <main className="container main_area main-column e_controls-page">
        <section className="section_item">
          <article>
            <h4 className="e_controls-page__heading centered-text flex-grid justify-s-side-in adjust-center">
              ENERGETIC
            </h4>


            <ul>
              {energyControls && energyControls.map(control => (
                <li key={control._id}>{control.name}</li>
              ))
              }

            </ul>


          </article>
        </section>
      </main>
  )
}

export default EnergyControls
