import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getApiResponse } from '@/Scripts/Services/api';
import MemoStatusesView from '@/containers/Memos/parts/memo-status-view';
import ToastService from '@/containers/System/Services/ToastService';
import '@/scss/memos-preview.scss';

import {
  Link,
  useParams,
} from 'react-router-dom';

const MemosSingleFull = () => {
  const { ids } = useParams();
  const toastRef = useRef();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [noteStatus, setStatus] = useState(false);
  const [isAdd] = useState(ids === 'add');
  const [formatedDate, setFormatedDate] = useState('');

  const history = useHistory();

  const getSuccess = (success) => {
    if (success) {
      toastRef.current.notifyService(`Note has been ${isAdd ? 'added' : 'updated'}`, 'success');
      setTimeout(() => history.push('/memos'), 1000);
    } else toastRef.current.notifyService(`Note hasn\'t been ${isAdd ? 'added' : 'updated'}`, 'error');
  
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const submitData = {
      name,
      description,
      status: noteStatus,
    };
    if (isAdd) {
      getApiResponse('memo', 'post', submitData, false).then( response => {
        getSuccess(response && !response.hasOwnProperty('error'))
      });
    } else {
      getApiResponse(`memo/${ids}`, 'put', submitData, false).then( response => {
        getSuccess(response && !response.hasOwnProperty('error'))
      });
    }
  };

  useEffect(() => {
    if (!isAdd) {
      getApiResponse(`memo/${ids}`, 'GET', null, false)
        .then((res) => {
          setName(res.name);
          setDescription(res.description);
          setStatus(res.status);
          setFormatedDate(res.updatedAt);
        });
    }
  }, []);

  return (
    <div className="memo_preview main-column">
      <form onSubmit={handleSubmit}>
        <div className="memo_preview__inner">
          <div>
            <label className="custom-label m_preview-label"
              htmlFor="memo-name"><b>Title:</b></label>
            <input
              id="memo-name"
              type="text"
              className="custom-input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="custom-label m_preview-label" htmlFor="memo-description">
              <b>Description:</b>
            </label>
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
                  onUpdateStatus={(status) => setStatus(status)}
                />
              </div>
              {!isAdd &&
              <div className="flex-grid adjust-center">
                <i className="material-icons">schedule</i>
                {formatedDate}
              </div>
              }             
            </div>
          </div>

          <div className="memo_preview__controls">

            {!isAdd ?
              <button type="submit" className="action-btn success w100">
                Update
              </button>
              :
              <button type="submit" className="action-btn success w100">
                Create note
              </button>
            }
            <Link className="action-btn warn w100" to="/memos">
              Close
            </Link>

          </div>

        </div>
      </form>
      <ToastService ref={toastRef} />
    </div>
  );
};

export default MemosSingleFull;
