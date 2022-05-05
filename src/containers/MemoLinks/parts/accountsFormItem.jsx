import React, { useState, useRef } from 'react';
import UseSetObjectValue from '@/Scripts/Hooks/useSetObjectValue';
import HelpersService from '@/Scripts/Services/_common';
import { setToastData } from "@/store/actions/index";
import { useDispatch } from 'react-redux';
import AccountsService from '@/Scripts/Services/units/AccountsService';
import ConfirmModal from '@/containers/System/Services/ConfirmModal';

const AccountsFormItem = ({ editStatus, account, isAdd, onAccountUpdate }) => {
  const [confirmModalState, setConfirmModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(account);
  const inputEl = useRef(null);
  const dispatch = useDispatch();

  const onChangeValue = (key, value) => {
    const accObj = UseSetObjectValue(key, value, currentAccount);
    setCurrentAccount(accObj);
  }

  const saveAccount = async () => {
    const { _id, type, value } = currentAccount;
    if (!isAdd) {
      const response = await AccountsService.updateAccounts({type, value}, _id);
      if (response) dispatch(setToastData({ title: 'Account has been updated', type: 'success' }))
      else dispatch(setToastData({ title: 'Account hasn\'t been updated', type: 'error' }))
    } else {
      const response = await AccountsService.addAccount({ type, value });
      if (response) dispatch(setToastData({ title: 'Account has been saved', type: 'success' }))
      else dispatch(setToastData({ title: 'Account hasn\'t been saved', type: 'error' }))
    }
    onAccountUpdate();
  };

  const deleteAccount = async (id) => {
    const response = await AccountsService.deleteAccounts(id);
    if (response) dispatch(setToastData({ title: 'Account has been deleted', type: 'success' }))
    else dispatch(setToastData({ title: 'Account hasn\'t been deleted', type: 'error' }))
    onAccountUpdate();
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
                placeholder="value"
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
                <i className="material-icons action-icon --accent-red" onClick={()=> setConfirmModal(true)}>delete</i>
                }
              </div>
            }
          </>
        }
      </div>
      {
        confirmModalState
        && <ConfirmModal
          memoId={currentAccount._id}
          confirmHeading="Warning!"
          confirmText={`You want to delete ${currentAccount.type}?`}
          cancelButtonText="cancel"
          confirmButtonText="delete"
          onCancel={() => setConfirmModal(false)}
          onConfirm={(id) => deleteAccount(id)}
        />
      }
    </form>
  )

}

export default AccountsFormItem