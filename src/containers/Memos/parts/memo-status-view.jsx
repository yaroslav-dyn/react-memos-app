import React, { useState, useEffect } from 'react';

const MemoStatusView = (props) => {

  const noteStatus = props.statusMemo;
  const noteStatusClasses = `status ${noteStatus ? 'complete' : 'pending'}`;
  const title = '';
  let statusHru = noteStatus ? '––Complete' : '––Pending';

  const emitStatus = (e) => {
    console.log(e.target);
  };

  useEffect( () => {
    console.log(
      props.statusMemo
    );
  });

  return (
    <div>
      <label htmlFor="status">{title}</label>
      <label htmlFor="status" className="flex-grid adjust-center">
        <input className="status_input" id="status" type="checkbox" onChange={emitStatus} />
          <i className={'material-icons ' + noteStatusClasses}>
            radio_button_unchecked
          </i>
          <span className={`status-label ${noteStatusClasses}`}>{statusHru}</span>
      </label>
    </div>

  )

};

export default MemoStatusView;




