import React, { useEffect, useState } from "react";
import ConfirmModal from '@/containers/System/Services/ConfirmModal';
import GroupService from '@/Scripts/Services/units/GroupService';
import { setToastData } from "@/store/actions/index";
import { useDispatch } from 'react-redux';
import Constant from "@/Scripts/Constants";

const GroupSetModal = ({
  currentGroup,
  onClose,
  onUpdateGroup
}) => {

  const defaultGroupData = { name: '', description: '', readOnly: false }
  const [groupItem, setGroupItem] = useState(defaultGroupData);
  const [newModalType, setCurrentModalType] = useState(false);
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

  const deleteGroup = async (id) => {
    const response = await GroupService.deleteGroups(id);
    if (response) dispatch(setToastData({ title: 'Group has been deleted', type: 'success' }))
    else dispatch(setToastData({ title: 'Group hasn\'t been deleted', type: 'error' }))
    setConfirmModal(false);
    onClose(false);
    onUpdateGroup();
  }

  const submitGroupForm = async (e) => {
    e.preventDefault();
    const { name, description, _id } = groupItem;
    let response = null;
    if (!newModalType) {
      response = await GroupService.updateGroups({ name, description }, _id);
    } else {
      response = await GroupService.addGroups({ name, description });
    }
    if (response) dispatch(setToastData({ title: `Group has been ${!newModalType ? 'updated' : 'added'}`, type: 'success' }));
    else dispatch(setToastData({ title: `Group hasn\'t been ${!newModalType ? 'updated' : 'added'}`, type: 'error' }));
    onClose(false);
    onUpdateGroup();
  }

  const changeFormType = (e) => {
    const isNewData = e.target.value === Constant.modalType.new
    setCurrentModalType(isNewData)
    if (isNewData) {
      setGroupItem(defaultGroupData)
    } else setGroupItem(currentGroup);
  }

  return (
    <div className="base-modal add-modal">
      <div className="base-modal__content add-modal__content group-set">

        <div className="flex-grid justify-right">
          <span className="material-icons action-icon" onClick={() => onClose(false)}>close</span>
        </div>

        <div className="group-set__type flex-grid">
          <div className="row flex-grid adjust-center">
            <input id="NEW" name='setTypeSelector'
              type="radio"
              checked={newModalType}
              value={Constant.modalType.new}
              onChange={changeFormType}
            />
            <label htmlFor="NEW">
              <i className="material-icons">add_box</i>
            </label>
          </div>
          <div className="row flex-grid adjust-center">
            <input id="EDIT"
              name='setTypeSelector'
              type="radio"
              checked={!newModalType}
              value={Constant.modalType.edit}
              onChange={changeFormType}
            />
            <label htmlFor="EDIT">
              <i className="material-icons">edit</i>
            </label>
          </div>
        </div>
        <br />
        <form name="group-set-modal" onSubmit={submitGroupForm}>
          <div>
            <label className="custom-label m_preview-label"
              htmlFor="group-name"><b>Name:</b></label>
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
            {!newModalType && !currentGroup.readOnly &&
              <i className="material-icons action-icon controls-settings delete"
                onClick={() => setConfirmModal(true)}>
                delete
              </i>
            }
            {!currentGroup.readOnly || newModalType ?
              <button className="action-btn success mobile100">{!newModalType ? 'Update' : 'Add'}</button>
              :
              <small className=" centered-text flex-grid adjust-center danger-text">
                <i className="material-icons">lock</i>
               <span> Default group</span>
              </small>
            }

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
