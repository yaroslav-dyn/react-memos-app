import React, { useEffect, useState, useCallback } from 'react';
import { getApiResponse } from '@/Scripts/Services/_common/api';


const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

const IdeaSinglePreview = ({ previewIdea, updateSingleIdea }) => {

  const [currentIdea, updateCurrentIdea] = useState({ text: '', name: '', group: '' });

  const changeCurrentData = (val, key) => {
    updateCurrentIdea({
      ...currentIdea,
      [key]: val
    });
  }
  const changeHandler = (e) => {
    console.log('e', currentIdea);
  }

  const onUpdate = useCallback(
    debounce(changeHandler, 600), []);

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
      <form name="idea-form">
        <textarea
          name="idea-text"
          className="custom-input area modern description_field"
          value={currentIdea.text}
          onInput={(e) => changeCurrentData(e.target.value, 'text')}
          onChange={(e)=> onUpdate(e.target.value)}
        >
        </textarea>
      </form>
    </div>
  )
}


export default IdeaSinglePreview;