import React, { useEffect, useState } from 'react';
import { getApiResponse } from '@/Scripts/Services/api';
import IdeaSingle from '@/containers/Ideas/parts/IdeaSingle';
import '@/scss/ideas.scss';

const IdeasIndex = () => {

  const [ideasArray, setIdeasArray] = useState([])

  useEffect(() => {
    getApiResponse('/ideas', 'GET', null, false, false, true).then(response => {
      if (response) setIdeasArray(response)
    })
  }, []);

  return (
    <main className="container main_area main-column ideas-page">
      <section className="section_item">
        <article>
          <ul className="ideas-groups">
            {ideasArray.length && ideasArray.map((idea, index) =>
              <IdeaSingle
                key={index}
                idea={idea}
              />
            )}
          </ul>
        </article>
      </section>
    </main>
  )
}

export default IdeasIndex;
