import React, { useState, useEffect } from 'react';

const MemoStatusView = ({
  onUpdateStatus,
  statusMemo
}) => {

  const [noteStatus, setStatus] = useState(false);
  const noteStatusClasses = `status ${noteStatus ? 'complete' : 'pending'}`;
  const title = '';
  const statusHru = noteStatus ? '––Complete' : '––Pending';

  useEffect(() => {
    setStatus(statusMemo);
  }, [statusMemo]);

  const changeStatus = (val) => {
    setStatus(val.target.checked);
    onUpdateStatus(val.target.checked);
  };

  return (
    <div>
      <label htmlFor="status">{title}</label>
      <label htmlFor="status" className="flex-grid adjust-center">
        <input
          className="status_input"
          id="status"
          type="checkbox"
          checked={noteStatus}
          onChange={e => changeStatus(e)}
        />
        <i className={`material-icons ${noteStatusClasses}`}>
          radio_button_unchecked
        </i>
        <span className={`status-label ${noteStatusClasses}`}>{statusHru}</span>
      </label>
    </div>
  );
};

export default MemoStatusView;
