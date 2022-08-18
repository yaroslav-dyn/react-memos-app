import React, {useEffect, useState} from 'react';
import EnergyControlsService from '@/Scripts/Services/units/EControlsService';
import '@/scss/e-controls.scss';
import EControlsTable from "@/containers/EnergyControls/parts/EControlsTable";
import AddControlsTableModal from "@/containers/EnergyControls/_common/add-controls-table-modal";

const EnergyControls = () => {

  const [energyControls, setEnergyControls] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState(false);


  const getEControls = () => {
    EnergyControlsService.getEnergyControls().then(response => setEnergyControls(response))
  }

  useState(() => {
    getEControls();
  })

  return (
      <main className="container main_area main-column e_controls-page">
        <section className="section_item">
          <article>
            <br />
            <div className="flex-grid justify-s-side-in">
              <h4 className="e_controls-page__heading centered-text adjust-center">
                <span>ENERGETIC</span>
              </h4>
              <button className="action-btn success" onClick={() => setConfirmModalState(true)}>
                add Control record
              </button>
            </div>

            <br />
            <EControlsTable
                energyControls={energyControls}
            />

            <br />

            {
              confirmModalState
              &&
              <AddControlsTableModal
                energyControls={energyControls}
                onClose={(state) => setConfirmModalState(state)}
              />
            }

          </article>
        </section>
      </main>
  )
}

export default EnergyControls
