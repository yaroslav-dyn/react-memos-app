import React, { useState, useRef } from 'react';
import UseSetObjectValue from '@/Scripts/Hooks/UseSetObjectValue.js'

const AccountsFormItem = ({ editStatus, account }) => {
 
  const inputEl = useRef(null);

  const [currentAccount, setCurrentAccount] = useState(account);

  const accountTypes = [
    {
      key: 'personalMail',
      value: 'Personal Email'
    },
    {
      key: 'corporateMail',
      value: 'Corporate Email'
    },
    {
      key: 'facebook',
      value: 'Facebook'
    }
  ]

  const onChangeValue = (key, value) => {

    const accObj = UseSetObjectValue(key, value, currentAccount);
    console.log(
      'accObj', accObj
    );
    setCurrentAccount(accObj);
  }

  const copyToClipBoard = () => {
    console.log('copy', inputEl.current);
    const selEl = inputEl.current;
    selEl.select();
    selEl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(selEl.value);
  }

  return (
    <div className="mlinks-form__item flex-grid adjust-center">

      <select
        name="accountTypes"
        id="accountTypes"
        className="custom-select"
        disabled={!editStatus}
        value={currentAccount.type}
        onChange={(e) => onChangeValue('type', e.target.value)}
        >
        {accountTypes && accountTypes.map(type =>
          <option key={type.key} value={type.key}>{type.value}</option>
        )}
      </select>

      <i className="material-icons action-icon copy --success" onClick={copyToClipBoard}>content_copy</i>

      <input 
        type="text" 
        className="custom-input" 
        value={currentAccount.value} 
        readOnly={!editStatus}
        ref={inputEl}
        onChange={(e) => onChangeValue('value', e.target.value)}
       />

      {editStatus &&
        <div className="mlinks-form__item--controls flex-grid adjust-center">
          <i className="material-icons action-icon --warn">edit</i>
          <i className="material-icons action-icon --danger">delete</i>
        </div>
      }
    </div>
  )

}

export default AccountsFormItem