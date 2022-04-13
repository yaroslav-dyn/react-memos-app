import React, { useState } from "react";
import ConfirmModal from '@/containers/System/Services/ConfirmModal';
import IdeasService from '@/Scripts/Services/units/IdeasService';
import { useDispatch } from 'react-redux';
import { setToastData } from '@/store/actions';


const IdeaPopoverControls = ({ previewIdea, onClosePopover }) => {

  const dispatch = useDispatch();

  const [confirmModalState, setConfirmModalState] = useState(false);

  const onDeleteIdea = () => {
    console.log('previewIdea', previewIdea);
    setConfirmModalState(true)
  }

  const deleteIdea = async (id) => {
    const response = await IdeasService.deleteIdeaService(id);
    if (response) {
      setConfirmModalState(false);
      dispatch(
        setToastData({ title: 'Idea has been deleted', type: 'success' })
      );
      onClosePopover('delete_item');
    } else {
      dispatch(
        setToastData({ title: 'Idea hasn\'t been deleted', type: 'error' })
      );
    }
  };

  return (
    <>
      <div className="account-content__item idea-popover__content" onClick={onDeleteIdea}>
        <i className="material-icons action-icon --danger">delete</i>
        <span> <span className="idea-group__name">{previewIdea.group} </span></span>
      </div>
      {
        confirmModalState
        && <ConfirmModal
          memoId={previewIdea._id}
          confirmHeading="Warning!"
          confirmText={`You want to delete ${previewIdea.group} idea?`}
          cancelButtonText="cancel"
          confirmButtonText="delete"
          onCancel={() => setConfirmModalState(false)}
          onConfirm={(id) => deleteIdea(id)}
        />
      }
    </>
  )

}

export default IdeaPopoverControls;