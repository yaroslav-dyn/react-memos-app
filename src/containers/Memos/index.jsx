import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getApiResponse } from '@/Scripts/Services/api';
import MemosSingle from '@/containers/Memos/parts/memo-single';
import '@/scss/memos.scss';


const MemosIndex = () => {

  const navigate = useHistory();

  const [memos, setMemos] = useState([
    { id: 0, title: '' }
  ]);

  const addMemo = () => {

  }

  const goToSingle = (e) => {
      navigate.push(`/memo/${e}`);
  }

  useEffect(() => {
    getApiResponse('memos', "GET", null, false).then((res) => {
      setMemos(res)
    });
  }, []);

  return (
    <main className="main_area main-column">
      <section className="section_item">

        <article>

          <div className="memos_list">

            {memos.map((memo, index) =>
          
              <MemosSingle key={index} memo={memo} onPress={goToSingle} />

            )}

          </div>

          <div className="memos_controls">
            <div className="memos_list">
              <button className="action-btn mobile100" onClick={addMemo}>Add</button>
            </div>
          </div>

        </article>

      </section>
    </main>
  )
}//;

export default MemosIndex;
