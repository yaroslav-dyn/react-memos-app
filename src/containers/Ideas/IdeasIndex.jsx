import React, { useEffect, useState } from 'react';
import { getApiResponse } from '@/Scripts/Services/api';
import IdeaSingle from '@/containers/Ideas/parts/IdeaSingle';
import IdeaSinglePreview from '@/containers/Ideas/parts/IdeaSinglePreview';
import '@/scss/ideas.scss';
import AddIdeaModal  from '@/containers/Ideas/_common/add-idea-modal';

const IdeasIndex = () => {

  const [ideasArray, setIdeasArray] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [addModalSate, setAddModalSate] = useState(false);

  useEffect(() => {
    getApiResponse('/ideas', 'GET', null, false, false, true).then(response => {
      if (response) {
        setCurrentGroup(response[0]);
        setIdeasArray(response);
      }
    })
  }, []);

  return (
    <main className="container main_area main-column ideas-page">
      <section className="section_item">
        <article>
          {currentGroup &&
            <IdeaSinglePreview previewIdea={currentGroup} />
          }
          <div className="ideas-page__controls">
            <span className="ideas-page__groups--item" onClick={() => setAddModalSate(true)}>
              <i className="material-icons">add</i>
            </span>
            <ul className="ideas-page__groups">
              {ideasArray && ideasArray.map((idea, index) =>
                <IdeaSingle
                  key={index}
                  selected={currentGroup ? currentGroup._id === idea._id : idea._id === ideasArray[0]._id}
                  idea={idea}
                  onSelectGroup={(group) => setCurrentGroup(group)}
                />
              )}
            </ul>
            <span className="ideas-page__groups--item">
              <i className="material-icons">more_vert</i>
            </span>
          </div>
        </article>
      </section>
      {addModalSate && 
        <AddIdeaModal 
        onClose={() => setAddModalSate(false)}
        />
      }
    </main>
  )
}

export default IdeasIndex;
