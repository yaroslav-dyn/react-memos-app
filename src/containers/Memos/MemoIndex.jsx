import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiResponse } from '@/Scripts/Services/_common/api';
import { setToastData } from '@/store/actions';
import MemosSingle from '@/containers/Memos/parts/memo-single';
import '@/scss/memos.scss';
import ConfirmModal from '@/containers/System/Services/ConfirmModal';
import SearchModule from '@/containers/System/Services/SearchModule';

const mapDispatchToProps = (dispatch) => {
  return {
    setToastMessage: toastData => dispatch(setToastData(toastData))
  };
};

const MemosIndex = ({ setToastMessage }) => {

  const navigate = useHistory();
  const [memos, setMemos] = useState([
    {
      id: 0,
      title: '',
    }
  ]);
  let timer = null;
  const [confirmId, setConfirmId] = useState(null);

  const goToSingle = (e) => {
    navigate.push(`/memo/${e}`);
  };

  const getDEfaultMemos = () => {
    getApiResponse('/memos', 'GET', null, false, false, true)
      .then((res) => {
        setMemos(res);
      });
  };

  const triggerConfirm = (status) => {
    setConfirmId(status);
  };

  const deleteMemo = (id) => {
    getApiResponse(`/memo/${id}`, 'DELETE', null, false, false, true)
      .then((res) => {
        if (res) {
          setToastMessage({ title: 'Note has been deleted', type: 'info' });
          getDEfaultMemos();
        } else setToastMessage({ title: 'Note hasn\'t been deleted', type: 'error' });
        triggerConfirm(false);
      });
  };

  const findMemo = (searchString) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getApiResponse(`/memos?name=${searchString}`, 'GET', null, false, false, true).then(res => {
        if (res) setMemos(res);
      })
    }, 750);

  }

  useEffect(() => {
    getDEfaultMemos();
  }, []);

  return (
    <main className="container main_area main-column memo-page">
      <section className="section_item">

        <br />
        <div className="memos_controls">
          <SearchModule
            placeholder="Search by name"
            onInputText={findMemo}
          />
          <div className="memos_list">
            <Link className="action-btn mobile100" to="/memo/add">Add</Link>
          </div>
        </div>

          <div className="memos_list">
            {memos.map((memo, index) =>
              <MemosSingle
                key={index}
                memo={memo}
                onPress={goToSingle}
                onDelete={triggerConfirm}
              />
            )}
          </div>
          
      </section>
      {
        confirmId
        && <ConfirmModal
          memoId={confirmId}
          confirmHeading="Warning!"
          confirmText="You want to delete note?"
          cancelButtonText="cancel"
          confirmButtonText="delete"
          onCancel={() => triggerConfirm(false)}
          onConfirm={deleteMemo}
        />
      }
    </main>
  );
};//

const MemosMainComponent = connect(null, mapDispatchToProps)(MemosIndex)

export default MemosMainComponent;
