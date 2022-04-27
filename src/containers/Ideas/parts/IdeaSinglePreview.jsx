import React, { useEffect, useState, useCallback } from 'react';
import { getApiResponse } from '@/Scripts/Services/_common/api';
import { DebounceInput } from 'react-debounce-input';

const IdeaSinglePreview = ({ previewIdea, updateSingleIdea }) => {

  const [currentIdea, updateCurrentIdea] = useState({ text: '', name: '', group: '' });

  const changeCurrentData = (val, key) => {
    updateCurrentIdea({
      ...currentIdea,
      [key]: val
    });
  }

  const onUpdateText = async (e) => {
    const { _id, group, name, text } = currentIdea;
    const response = await getApiResponse(`/idea/${_id}`, "PUT", { group, name, text }, false, false, true);
    if (response) updateSingleIdea(response);
  }

  useEffect(() => {
    updateCurrentIdea(previewIdea);
  }, [previewIdea]);

  return (
    <div>
      <h3> {previewIdea.name} </h3>
      <form name="idea-form">
        <DebounceInput 
          element="textarea" 
          name="idea-text"
          debounceTimeout={1000}
          className="custom-input area modern description_field"
          value={currentIdea.text}
          onInput={(e) => changeCurrentData(e.target.value, 'text')}
          onChange={(e) => onUpdateText(e.target.value)}
        />
      </form>
    </div>
  )
}


export default IdeaSinglePreview;