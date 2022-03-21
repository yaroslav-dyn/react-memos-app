import React from "react";

const ServicePopover = (props) => {

  return (
    <div className="base-modal service-popover">
      <div className="base-modal__content service-popover__content">

        <i className="material-icons" onClick={ () => props.hidePopover()}>expand_more</i>

        <div>
          <i className="material-icons">login</i>
          <span> Sign in </span>
        </div>

        <div>
          <i className="material-icons">logout</i>
          <span>Sign out</span>
        </div>

      </div>
    </div>
  )
}

export default ServicePopover;