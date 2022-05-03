import React, { useState } from 'react';
import AccountsForm from '@/containers/MemoLinks/parts/AccountsForm'

const MemoLinksIndex = () => {

  const [editState, setEditState] = useState(false);

  const triggerState = () => setEditState(editState ? false : true)

  return (
    <main className="container main_area main-column mlinks-page">
      <section className="section_item">
        <article>
          <h2 className="centered-text greeting-heading flex-grid justify-s-side-in adjust-center">
            <span>Links to your media</span> 
            <i className="action-icon material-symbols-outlined" onClick={() => triggerState()}>
              {!editState ? 'edit_note' : 'lock'}
            </i>
          </h2>

          <AccountsForm 
            editStatus={editState} 
          />

        </article>
      </section>
    </main>
  )

}

export default MemoLinksIndex