import React, {useState, useEffect} from 'react';
import EnergyControlsService from '@/Scripts/Services/units/EControlsService';
import dayjs from "dayjs";
import ConfirmModal from "@/containers/System/Services/ConfirmModal";


const EControlsTable = ({controlDate, energyControls, setCurrentRecords}) => {

  const [controlRecords, setControlsRecords] = useState(null);
  const [confirmModal, triggerConfirm] = useState(false);


  useEffect(() => {
    const currentMonth = dayjs(controlDate).month()
    getTableRecords(currentMonth);
    console.log('getTableRecords')
  }, [energyControls]);


  const deleteRecord = () => {
    triggerConfirm(false);
    controlRecords.forEach(rec => EnergyControlsService.deleteTableRecord(rec));
    getTableRecords(dayjs(controlDate).month());
  }

  const getTableRecords = (month) => {
    EnergyControlsService.getEnergyControlsRecords(month).then(response => {
      setControlsRecords(response);
      setCurrentRecords(response)
    })
  }
  return (
      <div>
        <div className="e-controls__table flex-grid justify-s-side-in row-mobile">
          {controlRecords && controlRecords
              .map(records => (
                  <div key={records._id} className="e-controls__table--item">
                    <div className="item_heading centered-text">{records.controlName} </div>
                    <strong>{records.value} </strong>
                    <div>{records.controlDate} </div>
                  </div>
              ))
          }
          {controlRecords && controlRecords.length > 0 &&
            <i className="action-icon material-symbols-outlined danger-text" onClick={() => triggerConfirm(true)}>
              delete
            </i>
          }
        </div>
        <div>
          {
            confirmModal
            && <ConfirmModal
                confirmHeading="Warning!"
                confirmText={`You want to delete record at ${dayjs(controlDate).format('MMMM, YYYY')}?`}
                cancelButtonText="cancel"
                confirmButtonText="delete"
                onCancel={() => triggerConfirm(false)}
                onConfirm={deleteRecord}
            />
          }
        </div>
      </div>
  )
}//

export default EControlsTable
