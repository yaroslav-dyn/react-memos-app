import React, { useState, useEffect } from "react";
import SearchModule from '@/containers/System/Services/SearchModule';
import FilterModule from '@/containers/System/Services/FilterModule';
import GroupSetModal from '@/containers/System/Services/GroupSetModal';
import { getApiResponse } from "@/Scripts/Services/_common/api";

const MemoSettingsModule = ({
  onSearchMemo,
  onChangeGroupFilter
}) => {

  const [groupSetModal, setGroupSetModal]  = useState(false);
  const [groups, setGroupsData]  = useState([]);

  useEffect(()=> {
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
          onClick={()=> setGroupSetModal(true)}
          >
          settings
        </span>
        <FilterModule onGroupChangeValue={onChangeGroupFilter} />
      </div>
      <GroupSetModal />
    </>
  )
}

export default MemoSettingsModule;