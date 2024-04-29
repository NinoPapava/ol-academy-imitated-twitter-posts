import { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { BarChart, BookmarkBorder, ChatBubbleOutline, Favorite, Repeat, VerifiedUser } from '@material-ui/icons'
import '../Styles/posts.scss'
import { Photos } from './Photos'

const Post = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <>
      {posts.map(post => (
        <div key={post.id} className='post'>
          <div className='post__avatar'>
            <Avatar />
          </div>
          <div className='post__body'>
            <div className='post__header'>
              <div className='post__headerText'>
                <h3>{post.title}</h3>
                <span className='post__headerSp'>
                  <VerifiedUser className='post__badge' />
                  @{post.userId}
                </span>
                <div className='post__dropdown'>
                  <span>...</span>
                  <div className='post__dropdown'>
                    <div className='post__dropdownContent'>
                      <button>like</button>
                      <button>See Tweet</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='post__bodySp'>
                <p >{post.body}</p>
              </div>
            </div>
            <Photos postId={post.id} />
            <div className='post__footer'>
              <ChatBubbleOutline className='icon' />
              <Repeat className='icon' />
              <Favorite className='icon' />
              <BarChart className='icon' />
              <BookmarkBorder className='icon' />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export { Post }