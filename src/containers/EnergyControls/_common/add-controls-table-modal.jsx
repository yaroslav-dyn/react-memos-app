import React, { useState, useEffect } from 'react';
import { setToastData } from '@/store/actions';
import { connect } from 'react-redux';
import EnergyControlsService from "@/Scripts/Services/units/EControlsService";
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import '@/scss/e-controls.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    setToastMessage: toastData => dispatch(setToastData(toastData))
  };
};

const addIdeaModalComponent = ({ onClose, energyControlsRecord, setToastMessage, energyControls, controlDate }) => {

  const [energyControlsModel, setEnergyControlsModel] = useState([...energyControls]);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(dayjs().toDate());

  const setObjectField = (value, key, index) => {
    const modifyArr = [...energyControls]
    modifyArr[index][key] = value;
    setEnergyControlsModel(modifyArr);
  };

  useEffect(() => {
    console.log('energyControlsRecord', energyControlsModel, energyControlsRecord);
    if (energyControlsRecord && energyControlsRecord.length > 0) {
      energyControlsModel.forEach(ctrl => {
        const currentRecord = energyControlsRecord.find(rec => rec.controlsId === ctrl._id);
        if (currentRecord) {
          ctrl.value = currentRecord.value;
          ctrl.recordId = currentRecord._id;
        } 
      })
    }
    if (controlDate) {
      setStartDate(controlDate);
    }
    return function cleanup() {
      setEnergyControlsModel([...energyControls])
    }
  }, []);

  const getControlSpec = (control) => {
    let digitStr = []
    let decimalStr = []
    for (let i = 0; i < control.digitCount; i++) {
      digitStr.push(0);
    }
    for (let i = 0; i < control.decimalCount; i++) {
      decimalStr.push(0);
    }

    return control.decimalCount ? [...digitStr, ',', ...decimalStr] : digitStr;
  }

  const createTableRecords = async (e) => {
    e.preventDefault();
    energyControlsModel.forEach(controlData => {
      let sendData = {
        controlsId: controlData._id,
        controlName: controlData.name,
        controlDate: dayjs(startDate).format("YYYY-MM-DD"),
        value: controlData.value,
        monthNumber: dayjs(controlDate).month(),
        yearNumber: dayjs(controlDate).year()
      }
      if (controlData && !energyControlsRecord && energyControlsRecord.length > 0) {
        EnergyControlsService.createTableRecord(sendData).then(res => {
          if (res) {
            setToastMessage({ title: `${controlData.name} sample has been added`, type: 'success' });
            onClose(true);
          } else setToastMessage({ title: `${controlData.name} sample hasn't been added`, type: 'error' });
        });
        setEnergyControlsModel([...energyControls])
      } else if (controlData && energyControlsRecord && energyControlsRecord.length > 0) {
        EnergyControlsService.uodateTableRecord(sendData, controlData.recordId).then(res => {
          if (res) {
            setToastMessage({ title: `${controlData.name} sample has been updated`, type: 'success' });
            onClose(true);
          } else setToastMessage({ title: `${controlData.name} sample hasn't been updated`, type: 'error' });
        });
        setEnergyControlsModel([...energyControls])
      }
    });
  };

  return (
    <div className="base-modal add-modal">
      <div className="base-modal__content add-modal__content controls-table__modal">

        <div className="flex-grid justify-right">
          <span className="material-icons action-icon" onClick={() => onClose(false)}>close</span>
        </div>


        <form className="idea-add__form" name="ideas" onSubmit={createTableRecords}>
          <div className="row">
            <label className="auth-type__label">Enter date</label>
            {/* <input
                  className="auth-type__input"
                  type="text"
                  value={selectedDate}
                  name="text"
                  onChange={ (e) => setSelectedDate(e.target.value)}
                  required
              />
 */}
            <DatePicker
              className="controls_picker"
              dateFormat="MMMM, yyyy"
              selected={startDate}
              showMonthYearPicker
              name="text"
              onChange={(e) => setStartDate(e)} />

          </div>

          <div className="flex-grid justify-s-side-in row-mobile">
            {
              energyControlsModel && energyControlsModel.map((control, index) => (
                <div key={index}>
                  <h4>{control.name} <span>{getControlSpec(control)}</span></h4>
                  <div className="row">
                    <label className="auth-type__label" htmlFor="group-name">Enter control value</label>
                    <input
                      className="auth-type__input"
                      type="text"
                      value={control.value}
                      onChange={(e) => setObjectField(e.target.value, 'value', index)}
                      id={control.name}
                      name={control.name}
                      required
                    />
                  </div>
                </div>

              ))
            }
          </div>

          <div className="base-modal__controls">
            <button
              type="submit"
              className="action-btn success mobile100">
              Create Control record
            </button>
          </div>
        </form>

      </div>
    </div>
  )

};

const AddControlTableModal = connect(null, mapDispatchToProps)(addIdeaModalComponent);

export default AddControlTableModal;
