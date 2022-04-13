import React from "react";

const SearchModule = ({
  placeholder,
  onInputText
}) => {

  return (
    <div className="search-module">
      <input type="text"
        className="auth-type__input search-input"
        onChange={(e) => onInputText(e.target.value)}
        placeholder={placeholder} />
    </div>
  )
}

export default SearchModule