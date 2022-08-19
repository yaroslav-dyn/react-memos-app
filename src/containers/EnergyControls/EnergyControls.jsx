import React, {useEffect, useState} from 'react';
import EnergyControlsService from '@/Scripts/Services/units/EControlsService';
import '@/scss/e-controls.scss';
import EControlsTable from "@/containers/EnergyControls/parts/EControlsTable";
import AddControlsTableModal from "@/containers/EnergyControls/_common/add-controls-table-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EnergyControls = () => {

  const [energyControls, setEnergyControls] = useState([]);
  const [energyControlsRecord, setEnergyControlsRecord] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [startDate, setStartDate] = useState(new Date());


  const getEControls = () => {
    EnergyControlsService.getEnergyControls().then(response => setEnergyControls(response))
  }

  const changeControlDate = (date) => {
    getEControls()
    setStartDate(date);
  }

  const setCurrentRecords = (records) => {
    setEnergyControlsRecord(records)
  }

  useEffect(() => {
   getEControls();
  },[])

  const closeAddModal = () => {
    setConfirmModalState(false);
    getEControls();
  }

  return (
      <main className="container main_area main-column e_controls-page">
        <section className="section_item">
          <article>
            <br />
            <div className="flex-grid justify-s-side-in adjust-center row-mobile">
              <h4 className="e_controls-page__heading centered-text adjust-center">
                <span>ENERGETIC</span>
              </h4>

              <div>
                <DatePicker
                    dateFormat="MMMM, yyyy"
                    selected={startDate}
                    showMonthYearPicker
                    onChange={changeControlDate} />

              </div>

              <button className="action-btn success mobile100" onClick={() => setConfirmModalState(true)}>
                add Control record
              </button>
            </div>

            <br />
            <EControlsTable
                controlDate={startDate}
                energyControls={energyControls}
                setCurrentRecords={setCurrentRecords}
            />

            <br />

            {
              confirmModalState
              &&
              <AddControlsTableModal
                energyControlsRecord={energyControlsRecord}
                controlDate={startDate}
                energyControls={energyControls}
                onClose={closeAddModal}
              />
            }

          </article>
        </section>
      </main>
  )
}

export default EnergyControls
