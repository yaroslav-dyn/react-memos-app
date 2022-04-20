import React, { useEffect, useState } from 'react';
import { getApiResponse } from '@/Scripts/Services/_common/api';

const IdeaSinglePreview = ({ previewIdea, updateSingleIdea }) => {

  const [currentIdea, updateCurrentIdea] = useState({ text: '', name: '', group: '' });

  const changeCurrentData = (val, key) => {
    updateCurrentIdea({
      ...currentIdea,
      [key]: val
    });
  }

  const updateIdeaContext = async (e) => {
    e.persist();
    const ideaText = e.target.value;
    changeCurrentData(ideaText, 'text');
    const { _id, group, name, text } = currentIdea;
    const response = await getApiResponse(`/idea/${_id}`, "PUT", { group, name, text }, false, false, true);
    if (response) updateSingleIdea(response)

  }

  useEffect(() => {
    updateCurrentIdea(previewIdea);
  }, [previewIdea]);

  return (
    <div>
      <h3> {previewIdea.name} </h3>
      <form name="idea-form" onBlur={(e)=> updateIdeaContext(e)}>
        <textarea
          name="idea-text"
          className="custom-input area modern description_field"
          value={currentIdea.text}
          onChange={(e) => changeCurrentData(e.target.value, 'text')}
          >
        </textarea>
      </form>
    </div>
  )
}


export default IdeaSinglePreview;