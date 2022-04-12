import React, { useEffect } from "react";


const IdeaPopoverControls = ({ previewIdea, onDeleteIdea }) => {


  


  return (
    <div className="account-content__item" onClick={onDeleteIdea}>
      <i className="material-icons">delete</i>
      <span> delete idea </span>
    </div>
  )

}

export default IdeaPopoverControls;