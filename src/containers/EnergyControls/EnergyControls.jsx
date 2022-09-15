import React, {useEffect, useState} from 'react';
import EnergyControlsService from '@/Scripts/Services/units/EControlsService';
import '@/scss/e-controls.scss';
import EControlsTable from "@/containers/EnergyControls/parts/EControlsTable";
import AddControlsTableModal from "@/containers/EnergyControls/_common/add-controls-table-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const EnergyControls = () => {

  const [energyControls, setEnergyControls] = useState([]);
  const [energyControlsRecord, setEnergyControlsRecord] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().toDate());


  const getEControls = () => {
    EnergyControlsService.getEnergyControls().then(response => setEnergyControls(response))
  }

  const changeControlDate = (date) => {
    setStartDate(date);
    getEControls()
  }

  const setCurrentRecords = (records) => {
    setEnergyControlsRecord(records)
  }

  const slideMonth = (direction) => {
    if(direction === 'prev') {
      const chDate = dayjs(startDate).subtract(1, 'M');
      changeControlDate(chDate.toDate())
    }
    else if (direction === 'next') {
      const chDate = dayjs(startDate).add(1, 'M');
      changeControlDate(chDate.toDate())
    }
  }

  const hasCurrentRecords = () => {
    return energyControlsRecord && energyControlsRecord.length > 0;
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

              <div className="flex-grid adjust-center justify-s-side-in picker_module">

                <i className="action-icon material-symbols-outlined controls_picker--btn" onClick={() => slideMonth('prev')}>
                  arrow_back_ios
                </i>

                <DatePicker
                    className="controls_picker"
                    dateFormat="MMMM, yyyy"
                    selected={startDate}
                    showMonthYearPicker
                    onChange={changeControlDate} />

                <i className="action-icon material-symbols-outlined controls_picker--btn" onClick={() => slideMonth('next')}>
                  arrow_forward_ios
                </i>
              </div>

              <button className="action-btn success mobile100" onClick={() => setConfirmModalState(true)}>
                 { (hasCurrentRecords() ? 'Edit' : 'Add') + ' Control record' }
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
