import React, { useState } from 'react';
import { setToastData } from '@/store/actions';
import IdeasService from '@/Scripts/Services/units/IdeasService';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    setToastMessage: toastData => dispatch(setToastData(toastData))
  };
};

const addIdeaModalComponent = ({ onClose, setToastMessage }) => {


  const defaultIdeaFields = {
    group: '',
    name: '',
    text: ''
  }

  const [ideaData, setIdeaData] = useState(defaultIdeaFields);

  const setObjectField = (value, key) => {
    setIdeaData({
      ...ideaData,
      [key]: value
    }
    )
  };

  const createIdea = async (e) => {
    e.preventDefault();
    const response = await IdeasService.addIdeaService(ideaData);
    if (response) {
      setToastMessage({ title: 'Idea has been added', type: 'success' });
      onClose();
    } else setToastMessage({ title: 'Note hasn\'t been added', type: 'error' });
  };

  return (
    <div className="base-modal add-modal">
      <div className="base-modal__content add-modal__content">

        <div className="flex-grid justify-right">
          <span className="material-icons" onClick={onClose}>close</span>
        </div>

        <form className="idea-add__form" name="ideas" onSubmit={createIdea}>

          <div className="row">
            <label className="auth-type__label" htmlFor="group-name">Enter group name</label>
            <input
              className="auth-type__input"
              type="text"
              value={ideaData.group}
              onChange={e => setObjectField(e.target.value, 'group')}
              id="group-name"
              name="group"
              required
            />
          </div>


          <div className="row">
            <label className="auth-type__label" htmlFor="group-title">Enter an idea title</label>
            <input
              className="auth-type__input"
              type="text"
              id="group-title"
              value={ideaData.name}
              name="name"
              onChange={e => setObjectField(e.target.value, 'name')}
            />
          </div>

          <div className="row">
            <label className="auth-type__label">Text</label>
            <textarea
              className="auth-type__input area idea-text__area"
              type="text"
              value={ideaData.text}
              name="text"
              onChange={e => setObjectField(e.target.value, 'text')}
            >
            </textarea>
          </div>
          <div className="base-modal__controls">
            <button
              type="submit"
              className="action-btn success mobile100">
              Create Idea
            </button>
          </div>
        </form>

      </div>
    </div>
  )

};

const AddIdeaModal = connect(null, mapDispatchToProps)(addIdeaModalComponent);

export default AddIdeaModal;