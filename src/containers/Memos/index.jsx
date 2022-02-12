import React from 'react';

const MemosIndex = () => {

  const testMethod = (e) => {
    console.log(
        'fired', e.target
    );
  }

  return (
    <main className="main_area main-column">
      <article>
        <div className="memos_controls">
          <div className="memos_list">
            <button className="action-btn mobile100" onClick={testMethod}>Click</button>
          </div>
        </div>

      </article>
    </main >
  )
}//;

export default MemosIndex;