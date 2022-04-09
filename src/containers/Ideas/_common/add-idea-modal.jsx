import React from "react";


const AddIdeaModal = ({onClose}) => {
  
  const createIdea = () => {

  }

  return(
    <div className="base-modal">
      <div className="base-modal__content">

        <span className="material-icons" onClick={onClose}>close</span>
       
        <form action="">
          <label htmlFor="group-name">Enter group name</label>
          <input type="text" id="group-name" />

          <label htmlFor="group-title">Enter an idea title</label>
          <input type="text" id="group-title" />

          <label>Text</label>
          <textarea type="text"></textarea>
        </form>
        <div className="base-modal__controls">
          <button
            type="button"
            className="action-btn success"
            onClick={() => createIdea}
          >
            Create Idea
          </button>
        </div>
      </div>
    </div>
  )

}

export default AddIdeaModal;