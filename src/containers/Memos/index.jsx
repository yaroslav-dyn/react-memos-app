import React, { useState, useEffect } from 'react';
import { getApiResponse } from '../../Scripts/Services/api';
import MemosSingle from './parts/memo-single';
import '../../scss/memos.scss';


const MemosIndex = () => {

  const [memos, setMemos] = useState([
    { id: 0, title: '' }
  ]);

  const testMethod = (e) => {
    console.log(
      'fired', e.target
    );
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
          
              <MemosSingle key={index} memo={memo} />

            )}

          </div>

          <div className="memos_controls">
            <div className="memos_list">
              <button className="action-btn mobile100" onClick={testMethod}>Add</button>
            </div>
          </div>

        </article>

      </section>
    </main>
  )
}//;

export default MemosIndex;
