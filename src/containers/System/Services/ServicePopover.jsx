import React, { useState } from 'react';
const classNames = require('classnames');
import "@/scss/templates.scss";

const ServicePopover = ({
  isOpen,
  popoverContent,
  hidePopover
}) => {

  const [animatedState, setAnimatedState] = useState(false);

  const bottomPopoverState = classNames(
    { 'base-modal__content service-popover__content': true },
    { isOpen},
    { 'slide-up': isOpen },
    { 'slide-down': animatedState }
  );

  const slidePopover = () => {
    setAnimatedState(true);
    setTimeout(()=> {
      hidePopover()
    }, 320)
  }
  return (

    <div className="base-modal service-popover">
      <div className={bottomPopoverState}>
        <i className="material-icons centered-text hide-icon action-icon" onClick={slidePopover}>expand_more</i>
          <div>
            {popoverContent}
          </div>
      </div>
    </div>
  )

};

export default ServicePopover;