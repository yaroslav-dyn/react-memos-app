import React, { useEffect, useState } from 'react';
import { getApiResponse } from '@/Scripts/Services/_common/api';

const IdeaSinglePreview = ({ previewIdea }) => {

  const [currentIdea, updateCurrentIdea] = useState({ text: '', name: '', group: '' });

  const changeCurrentData = (val, key) => {
    updateCurrentIdea({
      ...currentIdea,
      [key]: val
    });
  }

  const updateIdeaContext = () => {
    const { _id, group, name, text } = currentIdea;
    getApiResponse(
      `/idea/${_id}`,
      "PUT",
      { group, name, text },
      false,
      false,
      true
    ).then(response => {
      console.log(response);
    })
  }

  useEffect(() => {
    updateCurrentIdea(previewIdea);
  }, [previewIdea]);

  return (
    <div>
      <h3> {previewIdea.name} </h3>
      <form onBlur={updateIdeaContext}>
        <textarea 
          className="custom-input area description_field"
          value={currentIdea.text}
          onChange={(e) => changeCurrentData(e.target.value, 'text')}>
        </textarea>
      </form>
    </div>
  )
}


export default IdeaSinglePreview;