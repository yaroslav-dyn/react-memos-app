import React, { useState, useEffect } from 'react';
import AccountsFormItem from '@/containers/MemoLinks/parts/accountsFormItem'
import '@/scss/memo-links.scss';
import AccountsService from '@/Scripts/Services/units/AccountsService';

const AccountsForm = ({ editStatus }) => {

  const [accounts, setAccounts] = useState([]);

  const getDefaultAccounts = () => {
    AccountsService.getAccounts().then(response => {
      setAccounts(response)
    });
  }

  useEffect(() => {
    getDefaultAccounts();
  }, []);

  return (

    <div className='mlinks-module'>
      {accounts && accounts.map(link => (
        <AccountsFormItem
          key={link.type}
          account={link}
          editStatus={editStatus}
          onAccountUpdate={() => getDefaultAccounts()}
        />
      ))
      } 

      {editStatus &&
        <h4> Add new account </h4>
      }
      <AccountsFormItem
        account={{ type: '', value: '' }}
        editStatus={editStatus}
        isAdd={true}
        onAccountUpdate={() => getDefaultAccounts()}
      />
    </div>

  )
}

export default AccountsForm