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
  const [currentGroup, setCurrentGroup] = useState(false);
  const [groups, setGroupsData] = useState([]);

  const onChangeGroup = (groupId) => {
    const currentElement = groups.find(g => g._id === groupId)
    console.log('currentElement', currentElement);
    if (currentElement && currentElement.hasOwnProperty('name')) {
      setCurrentGroup(currentElement);
      onChangeGroupFilter(currentElement.name);
    }
  }

  useEffect(() => {
    getApiResponse('/groups', 'GET', null, false, false, true).then(response => {
      response && setGroupsData(response);
    });
  }, [])

  return (
    <>
      <div className="flex-grid justify-s-side-in adjust-center">
        <SearchModule
          placeholder="Search by name"
          onInputText={onSearchMemo}
        />
        <span
          className="material-icons action-icon controls-settings"
          onClick={() => setGroupModal(true)}
        >
          settings
        </span>
        {groups && groups.length > 0 &&
          <FilterModule
            filterData={groups}
            onGroupChangeValue={onChangeGroup} />
          }
      </div>
      {groupStateModal && currentGroup &&
        <GroupSetModal 
          currentGroup={currentGroup}
          onClose={() => setGroupModal(false)}
        />
      }
    </>
  )
}

export default MemoSettingsModule;