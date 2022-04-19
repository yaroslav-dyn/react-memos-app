import React, { useEffect, useState } from "react";
import ConfirmModal from '@/containers/System/Services/ConfirmModal';
import GroupService from '@/Scripts/Services/units/GroupService';
import { setToastData } from "@/store/actions/index";
import { useDispatch } from 'react-redux';

const GroupSetModal = ({
  currentGroup,
  onClose
}) => {

  const [groupItem, setGroupItem] = useState({ name: '', description: '' });
  const [confirmModalState, setConfirmModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGroup) setGroupItem(currentGroup);
  }, []);

  const setGroupKey = (value, key) => {
    setGroupItem({
      ...groupItem,
      [key]: value
    })
  };

  const deleteGroup = async(id) => {
    const response = await GroupService.deleteGroups(id);
    if (response) dispatch(setToastData({ title: 'Group has been deleted', type: 'success' })) 
    else dispatch(setToastData({ title: 'Group hasn\'t been deleted', type: 'error' })) 
    setConfirmModal(false);
  }

  const submitGroupForm = async(e) => {
    e.preventDefault();
    const {name, description, _id} = groupItem;
    const response = await GroupService.updateGroups({name, description}, _id);
    if (response) dispatch(setToastData({ title: 'Group has been updated', type: 'success' }))
    else dispatch(setToastData({ title: 'Group hasn\'t been updated', type: 'error' }))
    onClose(false);
  }

  return (
    <div className="base-modal add-modal">
      <div className="base-modal__content add-modal__content">

        <div className="flex-grid justify-right">
          <span className="material-icons action-icon" onClick={() => onClose(false)}>close</span>
        </div>

        <form name="Group-set-modal" onSubmit={submitGroupForm}>
          <div>
            <label className="custom-label m_preview-label"
              htmlFor="group-name"><b>Title:</b></label>
            <input
              id="group-name"
              type="text"
              className="custom-input modern"
              value={groupItem.name}
              onChange={e => setGroupKey(e.target.value, 'name')}
            />
          </div>
          <br />
          <div>
            <label className="custom-label" htmlFor="group-description">
              <b>Description:</b>
            </label>
            <textarea
              className="custom-input area modern description_field"
              id="group-description"
              name="description"
              value={groupItem.description || ''}
              onChange={e => setGroupKey(e.target.value, 'description')}
            />
          </div>

          <div className="flex-grid adjust-center">
            <i className="material-icons action-icon controls-settings delete"
              onClick={() => setConfirmModal(true)}>
              delete
            </i>
            <button className="action-btn success mobile100">Update</button>

          </div>

        </form>
      </div>
      {
        confirmModalState
        && <ConfirmModal
          memoId={groupItem._id}
          confirmHeading="Warning!"
          confirmText={`You want to delete ${groupItem.name} group?`}
          cancelButtonText="cancel"
          confirmButtonText="delete"
          onCancel={() => setConfirmModal(false)}
          onConfirm={(id) => deleteGroup(id)}
        />
      }
    </div>
  )
};

export default GroupSetModal
