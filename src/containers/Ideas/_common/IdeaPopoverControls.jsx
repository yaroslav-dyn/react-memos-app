import React from "react";


const IdeaPopoverControls = () => {

  const onDeleteIdea = () => {
    
  }

  return (
    <div className="account-content__item" onClick={onDeleteIdea}>
      <i className="material-icons">delete</i>
      <span> Delete idea </span>
    </div>
  )

}

export default IdeaPopoverControls;