import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiResponse } from '@/Scripts/Services/_common/api';
import MemoStatusesView from '@/containers/Memos/parts/memo-status-view';
import { setToastData } from '@/store/actions';
import '@/scss/memos-preview.scss';

import {
  Link,
  useParams,
} from 'react-router-dom';


const mapDispatchToProps = (dispatch) => {
  return {
    setToastMessage: toastData => dispatch(setToastData(toastData))
  };
};

const MemosSingleFull = ({ setToastMessage }) => {

  // TODO: Optimize the form fields.

  const { ids } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [noteStatus, setStatus] = useState(false);
  const [group, setGroup] = useState('unsorted');
  const [isAdd] = useState(ids === 'add');
  const [formatedDate, setFormatedDate] = useState('');
  const [groupsArray, setgroupsArray] = useState([]);

  const history = useHistory();

  const getSuccess = (success) => {
    if (success) {
      setToastMessage({ title: `Note has been ${isAdd ? 'added' : 'updated'}`, type: 'success' })
      history.push('/memos');
    } else {
      setToastMessage({ title: `Note hasn\'t been ${isAdd ? 'added' : 'updated'}`, type: 'error' });
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const submitData = {
      name,
      description,
      status: noteStatus,
      group: group
    };
    if (isAdd) {
      getApiResponse('/memo', 'post', submitData, false, false, true).then(response => {
        getSuccess(response && !response.hasOwnProperty('error'))
      });
    } else {
      getApiResponse(`/memo/${ids}`, 'put', submitData, false, false, true).then(response => {
        getSuccess(response && !response.hasOwnProperty('error'))
      });
    }
  };

  useEffect(() => {
    if (!isAdd) {
      getApiResponse(`/memo/${ids}`, 'GET', null, false, false, true)
        .then((res) => {
          setName(res.name);
          setDescription(res.description);
          setStatus(res.status);
          setGroup(res.group);
          setFormatedDate(res.updatedAt);
        });
    }

    const setPreselectedGroup = (groups) => {
      const selectedGroup = localStorage.getItem('memoGroup');
      if (selectedGroup) {
        const preSelected = groups.find(g => g._id === selectedGroup);
        preSelected && setGroup(preSelected.name)
      } else setGroup('unsorted');
    }

    getApiResponse(`/groups`, 'GET', null, false, false, true).then(resp => {
      setgroupsArray(resp);
      setPreselectedGroup(resp);
    })
  }, []);

  return (
    <div className="memo_preview main-column">
      <form className="container" name="addMemo" onSubmit={handleSubmit}>
        <div className="memo_preview__inner">
          <div>
            <label className="custom-label m_preview-label"
              htmlFor="memo-name"><b>Title:</b></label>
            <input
              name="memo-name"
              id="memo-name"
              type="text"
              className="custom-input modern"
              value={name}
              required
              onChange={e => setName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="custom-label m_preview-label" htmlFor="memo-description">
              <b>Description:</b>
            </label>
            <textarea
              className="custom-input area modern description_field"
              rows="4"
              id="memo-description"
              name="description"
              value={description || ''}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {group && 
            <div>
              <label className="custom-label m_preview-label"
                htmlFor="group-select"><b>Group:</b></label>
              <select
                name="group-select"
                id="group-select"
                className="custom-select group-select"
                value={group}
                onChange={e => setGroup(e.target.value)}
              >
                {groupsArray.map(opt =>
                  <option key={opt._id} value={opt.name}>{opt.name}</option>
                )
                }
              </select>

            </div>
          }

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
            <Link className="action-btn slave mobile100" to="/memos">
              Close
            </Link>

            <button type="submit" className="action-btn success mobile100">
              {!isAdd ? 'Update memo' : 'Create memo'}
            </button>

          </div>
        </div>

      </form>

    </div>
  );
};

const MemoSingleComponent = connect(null, mapDispatchToProps)(MemosSingleFull);
export default MemoSingleComponent;
