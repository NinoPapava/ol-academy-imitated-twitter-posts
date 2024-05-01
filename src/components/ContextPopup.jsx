import React from 'react'
import { Comments } from '../Api/Comments'
import { Photos } from '../Api/Photos'
import '../Styles/context.scss'

const ContextPopup = ({ onClose, post }) => {

  const handleClick = (event) => {
    event.stopPropagation();
  }

  return (
    <div className='popup__context' onClick={handleClick}>
      <div><button onClick={onClose}>X</button>
      <div className='post_photo'>
        <Photos postId={post.id} />
      </div>
      </div>
      <div className='post__header'>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <div className='post__comments'>
          <Comments postId={post.id} />
        </div>
      </div>
    </div>
  );
}

export { ContextPopup };