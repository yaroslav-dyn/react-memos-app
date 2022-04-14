import React, { useEffect, useState } from 'react';
import IdeaSingle from '@/containers/Ideas/parts/IdeaSingle'
import IdeaSinglePreview from '@/containers/Ideas/parts/IdeaSinglePreview';
import '@/scss/ideas.scss';
import AddIdeaModal from '@/containers/Ideas/_common/add-idea-modal';
import IdeasService from '@/Scripts/Services/units/IdeasService';
import ServicePopover from '@/containers/System/Services/ServicePopover';
import IdeaPopoverControls from '@/containers/Ideas/_common/IdeaPopoverControls';

const IdeasIndex = () => {

  const [ideasArray, setIdeasArray] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [addModalSate, setAddModalSate] = useState(false);
  const [showPopover, setPopoverState] = useState(false);

  const onCloneAddModal = (status) => {
    if (status) getDEfaultIdeas();
    setAddModalSate(false)
  }

  const getDEfaultIdeas = () => {
    IdeasService.getDEfaultIdeasService().then(response => {
      if (response) {
        setCurrentGroup(response[0]);
        setIdeasArray(response);
      }
    })
  }

  const getCurrentGroupItem = () => currentGroup ? currentGroup._id === idea._id : idea._id === ideasArray[0]._id;

  const updateSingleIdea = (idea) => {
    var foundIndex = ideasArray.findIndex(x => x._id == idea._id);
    const modifyArray = [...ideasArray];
    modifyArray[foundIndex] = idea;
    setIdeasArray(modifyArray);
  }

  const cutchAction = (action) => {
    if (action === 'delete_item') {
      getDEfaultIdeas();
    }
    setPopoverState(false)
  }

  useEffect(() => {
    getDEfaultIdeas();
  }, []);

  return (
    <main className="container main_area main-column ideas-page">
      <section className="section_item">
        <article>
          {currentGroup &&
            <IdeaSinglePreview previewIdea={currentGroup} updateSingleIdea={updateSingleIdea} />
          }
          <div className="ideas-page__controls">
            <span className="ideas-page__groups--item control--accent" onClick={() => setAddModalSate(true)}>
              <i className="material-icons">add</i>
            </span>
            <ul className="ideas-page__groups">
              {ideasArray && ideasArray.map((idea, index) =>
                <IdeaSingle
                  key={index}
                  selected={getCurrentGroupItem}
                  idea={idea}
                  onSelectGroup={(group) => setCurrentGroup(group)}
                />
              )}
            </ul>
            {currentGroup &&
              <span className="ideas-page__groups--item control--info" onClick={() => setPopoverState(true)}>
                <i className="material-icons">more_vert</i>
              </span>
            }
          </div>
        </article>
      </section>
      {addModalSate &&
        <AddIdeaModal
          onClose={(status) => onCloneAddModal(status)}
        />
      }
      {
        showPopover &&
        <ServicePopover
          isOpen={showPopover}
          hidePopover={e => setPopoverState(false)}
          popoverContent={
            <IdeaPopoverControls
              previewIdea={currentGroup}
              onClosePopover={action => cutchAction(action)}
            />}
        />
      }
    </main>
  )
}

export default IdeasIndex;
