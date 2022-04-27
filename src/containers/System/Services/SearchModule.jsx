import React from "react";
import { DebounceInput } from 'react-debounce-input';

const SearchModule = ({
  placeholder,
  onInputText
}) => {

  return (
    <div className="search-module">
      <DebounceInput
        className="auth-type__input search-input"
        onChange={(e) => onInputText(e.target.value)}
        debounceTimeout={1000}
        placeholder={placeholder} />
    </div>
  )
}

export default SearchModule