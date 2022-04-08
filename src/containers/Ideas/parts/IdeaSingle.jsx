import React from 'react'


const IdeaSingle = ({ idea }) => {

  return (
    <li className="ideas-groups__item">
      {idea.group}
    </li>
  )
}

export default IdeaSingle