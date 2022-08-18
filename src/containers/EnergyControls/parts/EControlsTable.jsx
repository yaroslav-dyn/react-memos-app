import React, {useState, useEffect} from 'react';
import EnergyControlsService from '@/Scripts/Services/units/EControlsService';


const EControlsTable = () => {

  const [controlRecords, setControlsRecords] = useState(null);


  useEffect(() => {
    getTableRecords();
    console.log('rec', controlRecords)
  });

  const getTableRecords = () => {
    if (!controlRecords)
      EnergyControlsService.getEnergyControlsRecords().then(response => {
        setControlsRecords(response);
      });

  }


  return (

      <div className="e-controls__table flex-grid justify-s-side-in">
        {controlRecords && controlRecords.map(records => (
            <div key={records._id} className="e-controls__table--item">
              <div className="centered-text">{records.controlName} </div>
              <span>{records.value} </span>
              <span>{records.controlDate} </span>

            </div>
        ))
        }
      </div>
  )

}//

export default EControlsTable
