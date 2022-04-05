import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getApiResponse } from '@/Scripts/Services/api';
import MemosSingle from '@/containers/Memos/parts/memo-single';
import '@/scss/memos.scss';
import ConfirmModal from '@/containers/System/Services/ConfirmModal';
import ToastService from '@/containers/System/Services/ToastService';


const MemosIndex = () => {
  const navigate = useHistory();
  const toastRef = useRef();

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
          toastRef.current.notifyService('Note has been delete', 'success');
          getDEfaultMemos();
        } else toastRef.current.notifyService('Note hasn\'t been delete', 'error');
        triggerConfirm(false);
      });
  };

  const findMemo = (searchString) => {
    console.log(searchString);
    clearTimeout(timer);
    timer = setTimeout(() => {
      getApiResponse(`/memos?name=${searchString}`, 'GET', null, false, false, true).then( res => {
        if (res) setMemos(res);
      })   
    }, 750);

  }

  useEffect(() => {
    getDEfaultMemos();
  }, []);

  return (
    <main className="container main_area main-column">
      <section className="section_item">
        <br />

        <input type="text" className="auth-type__input" onChange={(e) => findMemo(e.target.value)} />

        <article>
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
          <div className="memos_controls">
            <div className="memos_list">
              <Link className="action-btn mobile100" to="/memo/add">Add</Link>
            </div>
          </div>
        </article>
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
      <ToastService ref={toastRef} />
    </main>
  );
};//

export default MemosIndex;
