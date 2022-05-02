import React, { useState, useEffect } from "react";
import SearchModule from '@/containers/System/Services/SearchModule';
import FilterModule from '@/containers/System/Services/FilterModule';
import GroupSetModal from '@/containers/System/Services/GroupSetModal';
import { getApiResponse } from "@/Scripts/Services/_common/api";

const MemoSettingsModule = ({
  onSearchMemo,
  onChangeGroupFilter
}) => {

  const [groupStateModal, setGroupModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groups, setGroupsData] = useState([]);

  const onChangeGroup = (groupId) => {
    const currentElement = groups.find(g => g._id === groupId);
    if (currentElement && currentElement.hasOwnProperty('_id')) {
      setCurrentGroup(currentElement);
      onChangeGroupFilter(currentElement._id);
    } else {
      setCurrentGroup(null);
      onChangeGroupFilter(null);
    }
  }

  const getDefaultGroups = () => {
    getApiResponse('/groups', 'GET', null, false, false, true).then(response => {
      response && setGroupsData(response);
    });
  }

  useEffect(() => {
    getDefaultGroups();
  }, [])

  return (
    <>
      <div className="flex-grid justify-s-side-in adjust-center">
        <SearchModule
          placeholder="Search"
          onInputText={onSearchMemo}
        />
        {currentGroup  &&
          <span
            className="material-icons action-icon controls-settings"
            onClick={() => setGroupModal(true)}>
            settings
          </span>
        }
        {groups && groups.length > 0 &&
          <FilterModule
            filterData={groups}
            onGroupChangeValue={onChangeGroup} />
        }
      </div>
      {groupStateModal && currentGroup &&
        <GroupSetModal
          currentGroup={currentGroup}
          onUpdateGroup={()=> getDefaultGroups()}
          onClose={() => setGroupModal(false)}
        />
      }
    </>
  )
}

export default MemoSettingsModule;