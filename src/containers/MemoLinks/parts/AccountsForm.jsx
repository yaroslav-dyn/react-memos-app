import React, { useState } from 'react';
import AccountsFormItem from '@/containers/MemoLinks/parts/accountsFormItem'
import '@/scss/memo-links.scss';

const AccountsForm = ({ editStatus }) => {

  const hardContactData = [
    {
      type: 'personalMail',
      value: 'yaroslav.kurilin.z@gmail.com'
    },
    {
      type: 'corporateMail',
      value: 'yaroslav.kurilin.wedev@gmail.com'
    },
    {
      type: 'facebook',
      value: 'www.facebook.com/norman.zp'
    }
  ]

  const [linksArray, setLinksArray] = useState([]);

  return (
    <div className='mlinks-module'>

      <form name="mlinks-form">

        {hardContactData && hardContactData.map(link => (
          <AccountsFormItem
            key={link.type}
            account={link}
            editStatus={editStatus}
          />
        ))
        }

      </form>

    </div>
  )

}

export default AccountsForm