import React, { useEffect, useState } from 'react';
import { getApiResponse } from '@/Scripts/Services/api';
import MemoStatusesView   from '@/containers/Memos/parts/memo-status-view';
import '@/scss/memos-preview.scss'

import {
  Link,
  useParams
} from 'react-router-dom';

const MemosSingleFull = () => {

  const { ids } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [noteStatus, setStatus] = useState(false);
  const [formatedDate, setFormatedDate] = useState('');

  const updateNote = () => {

  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(
      'submit', { name, description },
    );
  };

  useEffect(() => {
    getApiResponse(`memo/${ids}`, 'GET', null, false).then((res) => {
      setName(res.name);
      setDescription(res.description);
      setStatus(res.status);
      setFormatedDate(res.updatedAt);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="memo_preview main-column">

      <div className="memo_preview__inner">
        <div>
          <label className="custom-label m_preview-label" htmlFor="memo-name"><b>Title:</b></label>
          {name}
          <input
            id="memo-name"
            type="text"
            className="custom-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="custom-label m_preview-label" htmlFor="memo-description"><b>Description:</b></label>
          <textarea
            className="custom-input area description_field"
            rows="4"
            id="memo-description"
            name="description"
            value={description || ''}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div>
          <div className="flex-grid adjust-center justify-s-side-in memo_status-box__time-edit">
             <div className="memo_status-box">
                <MemoStatusesView
                  statusMemo={noteStatus}
                  />
              </div>
            <div className="flex-grid adjust-center">
              <i className="material-icons">schedule</i>
               { formatedDate }
            </div>
          </div>
        </div>

        <div className="memo_preview__controls">
          <Link className="action-btn warn w100" to="/memos">
            Close
          </Link>

          <button type="button" className="action-btn success w100" onClick={updateNote}>
            Update
          </button>
        </div>

      </div>

    </form>
  );
};


export default MemosSingleFull;
