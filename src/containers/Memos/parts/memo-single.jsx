import React from 'react';
const classNames = require('classnames');

const MemosSingle = ({
  memo,
  onPress,
  onDelete,
}) => {
  const statusLabelClasses = classNames(
    'status hide-mobile', memo.status ? 'complete' : 'pending',
  );
  const statusIconClasses = classNames(
    'material-icons status', memo.status ? 'complete' : 'pending',
  );

  return (
    <div className="personal-cart"
         onClick={(e) => onPress(memo._id)}>
      <div className="header_cart"> {memo.name} </div>
      <div className="hide-mobile">{memo.description}</div>
      <div className={statusLabelClasses}>
        {memo.status ? 'Complete' : 'Pending'}
      </div>
      <div className="hide-desktop">
        <i className={statusIconClasses}>
          radio_button_unchecked
        </i>
      </div>
      <div>
        <i className="material-icons memo-icons icon_close attention"
           onClick={(e) => {
             if (e.defaultPrevented) return; // Exits here if event has been handled
             e.stopPropagation();
             onDelete(memo._id);
           }}>
          clear
        </i>
      </div>
    </div>
  );
};//

export default MemosSingle;
