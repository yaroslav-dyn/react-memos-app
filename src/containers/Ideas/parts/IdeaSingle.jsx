import classNames from 'classnames'
import React from 'react'

const IdeaSingle = ({ idea, selected, onSelectGroup }) => {

  const ideaGroupClass = classNames('ideas-page__groups--item', selected ? 'selected' : '');

  return (
    <li className={ideaGroupClass} onClick={() => onSelectGroup(idea)}>
      {idea.group.substring(0, 2)}
    </li>
  )
}

export default IdeaSingle