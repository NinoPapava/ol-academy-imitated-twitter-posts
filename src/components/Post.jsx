import { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { BarChart, BookmarkBorder, ChatBubbleOutline, Favorite, Repeat, VerifiedUser } from '@material-ui/icons'
import { Photos } from '../Api/Photos'
import { Comments } from '../Api/Comments'
import '../Styles/posts.scss'

const Post = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
    {posts.map(post => (
      <div key={post.id} >
        <div className='post'>
          <div>
            <div className='post__body'  >
              <div className='post__avatar'>
                <Avatar />
              </div>
              <h3>{post.title}</h3>
              <span className='post__headerSp'>
                <VerifiedUser className='post__badge' />
                @{post.userId}
              </span>
            </div>
            <div className='post__bodySp' >
              <p >{post.body}</p>
            </div>
            <div className='post__image' >
              <Photos postId={post.id} />
            </div>
          </div>
          <div >
            <div className='post__dropdown'>
              <span className='post__span'>...</span>
              <div className='post__dropdownSp'>
                {/* აქ უნდა გავხსნა dropDown  */}
                  <div className='post__dropdownContent'>
                    <p>like</p>
                    <p>See Tweet</p>
                  </div>
                  {/*  */}
              </div>
            </div>
            <div className='post__icons'>
              <ChatBubbleOutline />
              <Repeat />
              <Favorite />
              <BarChart />
              <BookmarkBorder />
            </div>
            <Comments />
          </div>
        </div>
      </div>
    ))}
    </div>
  )
}

export { Post }