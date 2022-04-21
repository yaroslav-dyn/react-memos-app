import React, { useEffect, useState } from "react";

const FiltersModule = ({
  filterData,
  onGroupChangeValue
}) => {

  const [groupValue, setGroupValue] = useState('');


  useEffect(() => {
    const selectedGroup = localStorage.getItem('memoGroup');
    if (selectedGroup) {
      setGroupValue(selectedGroup);
      onGroupChangeValue(selectedGroup);
    }
  }, []);

  const onGroupChange = (value) => {
    setGroupValue(value);
    onGroupChangeValue(value);
    localStorage.setItem('memoGroup', value);
  }

  return (
    <div className="filter-module flex-grid adjust-center">
      <select
        name="group-select"
        id="group-select"
        className="custom-select group-select"
        value={groupValue}
        onChange={e => onGroupChange(e.target.value)}
      >
        <option value="all">All</option>
        {filterData.map(opt =>
          <option key={opt._id} value={opt._id}>{opt.name}</option>
        )
        }
      </select>
      {groupValue && groupValue !== 'all' &&
        <i className="material-icons --danger clear-filter"
          onClick={() => onGroupChange('all')}
        >
          cancel
        </i>
      }
    </div>
  )
}

export default FiltersModule