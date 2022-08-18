import React, {useState, useEffect} from 'react';
import {setToastData} from '@/store/actions';
import {connect} from 'react-redux';
import EnergyControlsService from "@/Scripts/Services/units/EControlsService";


const mapDispatchToProps = (dispatch) => {
  return {
    setToastMessage: toastData => dispatch(setToastData(toastData))
  };
};

const addIdeaModalComponent = ({onClose, setToastMessage, energyControls}) => {


  const [controlsData, setControlsData] = useState({controlId: null, value: '', controlDate: ''});
  const [energyControlsModel, setEnergyControlsModel] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const setObjectField = (value, key, index) => {
    const modifyArr = energyControlsModel;
    modifyArr[index][key] = value;
    setEnergyControlsModel(
        modifyArr
    )
  };

  useEffect(() => {
    energyControls && setEnergyControlsModel(energyControls)
  });


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

    console.log('track', selectedDate, energyControlsModel)

   energyControlsModel.forEach(controlData => {
      let sendData = {
        controlsId: controlData._id,
        controlName: controlData.name,
        controlDate: selectedDate,
        value: controlData.value
      }
      EnergyControlsService.createTableRecord(sendData).then(res => {
        if (res) {
          setToastMessage({title: `${controlsData.name} sample has been added`, type: 'success'});
          onClose(true);
        } else setToastMessage({title: `${controlsData.name} sample hasn't been added`, type: 'error'});
      })

    })


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
              <input
                  className="auth-type__input"
                  type="text"
                  value={selectedDate}
                  name="text"
                  onChange={e => setSelectedDate(e.target.value)}
                  required
              />
            </div>

            <div className="flex-grid justify-s-side-in">
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
                            onChange={e => setObjectField(e.target.value, 'value', index)}
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
