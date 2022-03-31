import React from 'react';
const classNames = require('classnames');

const ServicePopover = ({
  isOpen,
  popoverContent,
  hidePopover
}) => {
  const bottomPopoverState = classNames('base-modal__content service-popover__content ', isOpen ? 'isOpen' : '');

  return (
    <div className="base-modal service-popover">
      <div className={bottomPopoverState}>

        <i className="material-icons centered-text hide-icon action-icon"
          onClick={() => hidePopover()}>expand_more</i>
        
        <div onClick={() => hidePopover()}>
          {popoverContent}
        </div>

      </div>
    </div>
  )
}

export default ServicePopover;