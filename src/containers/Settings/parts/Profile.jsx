import React, { useEffect, useState } from 'react';
import { getApiResponse } from '@/Scripts/Services/api';
import { connect } from 'react-redux';
import { getProfile, setToastData } from '@/store/actions';

const mapStateToProps = state => {
  return { userProfile: state.userProfile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: user => dispatch(getProfile(user)),
    setToastMessage: toastData => dispatch(setToastData(toastData))
  };
};

const ProfileComponent = ({ userProfile, getProfile, setToastMessage}) => {

  const [profileEmail, setProfileEmail] = useState('');
  const [profileNickname, setNickname] = useState('');


  const saveProfile = (e) => {
    e.preventDefault();
    const submitData = { nickname: profileNickname }
    const userID = userProfile._id;
    getApiResponse(`/profile/${userID}`, 'put', submitData, false, false, true).then(response => {
      if (response) setToastMessage({title: 'Profile has been updated!', type: 'success'})
      else setToastMessage({ title: 'Error! Profile hasn\'t been updated!', type: 'error' })
    });
  }

  const setProfileData = (user) => {
    setProfileEmail(user.email);
    setNickname(user.nickname);
  }

  useEffect(() => {
    getApiResponse('/profile', 'GET', null, false, false, true).then(response => {
      if (response) {
        getProfile(response.user);
        setProfileData(response.user);
      }
    })
    return () => {
      setToastMessage(null);
    }
  }, []);

  return (
    <div className="profile-page">

      <div className="profile-page__avatar centered-text">
        <span className="material-icons-outlined no-avatar">
          manage_accounts
        </span>
      </div>

      {userProfile &&
        <form name="profile-form" className="profile-form" onSubmit={(e) => saveProfile(e)}>
          <div className="row">
            <label className="auth-type__label" htmlFor="email">Email</label>
            <input type="email"
              className="auth-type__input"
              value={profileEmail}
              onChange={(e) => { setProfileEmail(e.target.value) }} />
          </div>
          <br />
          <div className="row">
            <label className="auth-type__label" htmlFor="email">Nickname</label>
            <input type="text"
              className="auth-type__input"
              value={profileNickname}
              onChange={(e) => { setNickname(e.target.value) }} />
          </div>

          <br />
          <button className="action-btn success mobile100">Save</button>

        </form>
      }

    </div>
  )
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export default Profile;