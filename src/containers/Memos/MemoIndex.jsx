import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getApiResponse } from '@/Scripts/Services/api';
import MemosSingle from '@/containers/Memos/parts/memo-single';
import '@/scss/memos.scss';


const MemosIndex = () => {

  const navigate = useHistory();

  const [memos, setMemos] = useState([
    {
      id: 0,
      title: ''
    }
  ]);

  const addMemo = () => {

  };

  const goToSingle = (e) => {
    navigate.push(`/memo/${e}`);  
  };

  const deleteMemo = (id) => {
    getApiResponse(`memo/${id}`, 'DELETE', null, false)
      .then((res) => {
        if(res) getDEfaultMemos();
      });
  }

  const getDEfaultMemos = () => {
    getApiResponse('memos', 'GET', null, false)
      .then((res) => {
        setMemos(res);
      });
  }

  useEffect(() => {
    getDEfaultMemos();
  }, []);

  return (
    <main className="main_area main-column">
      <section className="section_item">
        <article>
          <div className="memos_list">
            {memos.map((memo, index) =>
              <MemosSingle
                key={index}
                memo={memo}
                onPress={goToSingle}
                onDelete={deleteMemo}
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
    </main>
  );
};//

export default MemosIndex;
