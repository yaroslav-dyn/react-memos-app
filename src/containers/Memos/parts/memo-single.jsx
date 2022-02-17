import React from 'react';

const MemosSingle = (props) => {

  /**  TODO: Rewrite this with 'statusIconClasses' **/
  let statusLabelClasses = 'status hide-mobile';
  let statusIconClasses = 'material-icons status';
  if(props.memo.status) {
    statusLabelClasses += ' complete';
    statusIconClasses += ' complete';
  } else {
    statusLabelClasses += ' pending';
    statusIconClasses += ' pending';
  }

  return (
    <div className="personal-cart" onClick={() => props.onPress(props.memo._id)}>
      <div className="header_cart" > {props.memo.name} </div>
      <div className="hide-mobile">{props.memo.description}</div>
      <div className={statusLabelClasses}>
        {props.memo.status}
      </div>
      <div className="hide-desktop">
        <i className={statusIconClasses}>
          radio_button_unchecked
        </i>
      </div>
      <div>
        <i className="material-icons memo-icons icon_close attention">
          clear
        </i>
      </div>
    </div>
  )
}//

export default MemosSingle