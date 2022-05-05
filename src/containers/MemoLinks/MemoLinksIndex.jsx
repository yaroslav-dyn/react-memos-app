import React, { useState } from 'react';
import AccountsForm from '@/containers/MemoLinks/parts/AccountsForm'

const MemoLinksIndex = () => {

  const [editState, setEditState] = useState(false);

  const triggerState = () => setEditState(editState ? false : true)

  return (
    <main className="container main_area main-column mlinks-page">
      <section className="section_item">
        <article>
          <h4 className="centered-text flex-grid justify-s-side-in adjust-center">
            <span>Links to your media</span> 
            <i className="action-icon material-symbols-outlined edit_icon" onClick={() => triggerState()}>
              {!editState ? 'edit_note' : 'lock'}
            </i>
          </h4>

          <AccountsForm 
            editStatus={editState} 
          />

        </article>
      </section>
    </main>
  )

}

export default MemoLinksIndex