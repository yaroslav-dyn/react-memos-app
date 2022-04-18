import React, { useState } from "react";

const FiltersModule = ({
  filterData,
  onGroupChangeValue
}) => {

  const [groupValue, setGroupValue] = useState('');

  const onGroupChange = (value) => {
    setGroupValue(value);
    onGroupChangeValue(value);
  }

  return (
    <div className="filter-module">
      <select
        name="group-select"
        id="group-select"
        className="custom-select group-select"
        value={groupValue}
        onChange={e => onGroupChange(e.target.value)}
      >
        <option value="all" >All</option>
        <option value="unsorted" >Unsorted</option>
        {filterData.map( opt => 
          <option key={opt._id} value={opt.name}>{opt.name}</option>
        )
      }
      </select>
    </div>
  )
}

export default FiltersModule