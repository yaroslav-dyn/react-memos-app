import React, { useState, useRef } from 'react';
import UseSetObjectValue from '@/Scripts/Hooks/UseSetObjectValue.js';
import HelpersService from '@/Scripts/Services/_common';
import { getApiResponse } from '@/Scripts/Services/_common/api';

const AccountsFormItem = ({ editStatus, account, isAdd }) => {

  const inputEl = useRef(null);

  const [currentAccount, setCurrentAccount] = useState(account);

  const onChangeValue = (key, value) => {
    const accObj = UseSetObjectValue(key, value, currentAccount);
    setCurrentAccount(accObj);
  }

  const saveAccount = () => {
    const { _id, type, value } = currentAccount;
    if (!isAdd) {
      getApiResponse(
        `/account/${_id}`,
        'PUT',
        { type, value },
        false,
        false,
        true
      ).then(result => {
        console.log('put res', result);
      })
    } else {
      getApiResponse(
        '/account',
        'POST',
        { type, value },
        false,
        false,
        true
      ).then(result => {
        console.log('post res', result);
      })
    }

  };
  const deleteAccount = () => {
    getApiResponse(
      `/account/${currentAccount._id}`,
      'DELETE',
      null,
      false,
      false,
      true
    ).then(result => {
      console.log('del res', result);
    })
  };

  const copyToClipBoard = () => !editStatus && HelpersService.copyToClipboard(inputEl.current, true);

  return (
    <form name="mlinks-module__form">
      
      <div className="mlinks-module__form__item flex-grid adjust-center">
        {/* <select
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
      </select> */}

        {(!isAdd || (isAdd && editStatus)) &&
          <>
            <input
              type="text"
              className="custom-input account_type"
              value={currentAccount.type}
              readOnly={!editStatus}
              onChange={(e) => onChangeValue('type', e.target.value)}
              placeholder="Account type"
              required
            />

            <div className="account_value--container">
              <input
                type="text"
                className="custom-input account_value"
                value={currentAccount.value}
                readOnly={!editStatus}
                ref={inputEl}
                onChange={(e) => onChangeValue('value', e.target.value)}
                onClick={copyToClipBoard}
                placeholder="Value"
              />

              {!editStatus &&
                <i className="material-icons action-icon copy --success hide-mobile" onClick={copyToClipBoard}>
                  content_copy
                </i>
              }

            </div>

            {editStatus &&
              <div className="mlinks-form__item--controls flex-grid adjust-center">
                <i className="material-icons action-icon --success" onClick={saveAccount}>save</i>
                {!isAdd &&
                  <i className="material-icons action-icon --accent-red" onClick={deleteAccount}>delete</i>
                }
              </div>
            }
          </>
        }
      </div>
    </form>
  )

}

export default AccountsFormItem