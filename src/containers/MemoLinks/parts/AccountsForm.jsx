import React, { useState, useEffect } from 'react';
import AccountsFormItem from '@/containers/MemoLinks/parts/accountsFormItem'
import '@/scss/memo-links.scss';
import { getApiResponse } from '@/Scripts/Services/_common/api';

const AccountsForm = ({ editStatus }) => {

  const [accounts, setAccounts] = useState([]);

  const getDefaultAccounts = () => {
    getApiResponse(
      '/accounts',
      'GET',
      null,
      false,
      false,
      true
    ).then(response => {
      response && setAccounts(response);
    })
  }

  useEffect(() => {
    getDefaultAccounts()
  }, []);

  return (

    <div className='mlinks-module'>
      {accounts && accounts.map(link => (
        <AccountsFormItem
          key={link.type}
          account={link}
          editStatus={editStatus}
        />
      ))
      }

      <br />
      {editStatus &&
        <h4> Add new account </h4>
      }
      <AccountsFormItem
        account={{ type: '', value: '' }}
        editStatus={editStatus}
        isAdd={true}
      />
    </div>

  )
}

export default AccountsForm