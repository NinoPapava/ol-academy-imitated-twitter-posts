import '../Styles/posts.scss'
import { useState, useEffect, useRef } from 'react'
import { BarChart, BookmarkBorder, ChatBubbleOutline, Favorite, FavoriteBorder, Repeat, VerifiedUser } from '@material-ui/icons'
import { Photos } from '../Api/Photos'
import { Comments } from '../Api/Comments'
import { ClickPopup } from './ClickPopup'
import { ContextPopup } from './ContextPopup'
import { DefAvatar } from './DefAvatar'

const Post = () => {
  const [posts, setPosts] = useState([])
  const [isPostOpen, setIsPostOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const postPopupRef = useRef(null);

  const [liked, setLiked] = useState(() => {
    const likedPosts = localStorage.getItem('likedPosts');
    return likedPosts ? JSON.parse(likedPosts) : {};
  })

  const toggleLike = (postId) => {
    setLiked((likedId) => {
      const saveLikedPostId = { ...likedId };
      saveLikedPostId[postId] ? delete saveLikedPostId[postId] : saveLikedPostId[postId] = true
      localStorage.setItem('likedPosts', JSON.stringify(saveLikedPostId));
      return saveLikedPostId;
    });
  };

  const handleClickOutside = (event) => {
    if (postPopupRef.current && postPopupRef.current.contains(event.target)) {
      setIsPostOpen(false);
    }
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  useEffect(() => {
    isPostOpen
      ? document.addEventListener('mousedown', handleClickOutside)
      : document.removeEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPostOpen]);

  return (
    <>
      {isPostOpen && selectedPost ? (
        <>
        <ClickPopup onClick={() => setIsPostOpen(!isPostOpen)} >
            <ContextPopup post={selectedPost} onClose={() => setIsPostOpen(!isPostOpen)} >
              <Comments postId={selectedPost.id} />
            </ContextPopup>
          </ClickPopup>
        </>
      ) : (
        <>
        {posts.map(post => (
          <div key={post.id} >
            <div className='post'>
              <div onClick={() => { setSelectedPost(post); setIsPostOpen(true); setOpenDropdown(false) }} >
                <div className='post__body'  >
                  <div className='post__avatar'>
                    <DefAvatar className="post__avatar" name={post.title.charAt(0)} />
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
                  <span className='post__span'  onClick={() => setOpenDropdown(!openDropdown)}>...</span>
                  <div className='post__dropdownSp'>
                  {openDropdown && (
                    <div className='post__dropdownContent'>
                    {liked[post.id] ? <p onClick={() => toggleLike(post.id)}>Unlike</p> : <p onClick={() => toggleLike(post.id)}>Like</p>}
                      <p onClick={() => { setSelectedPost(post); setIsPostOpen(true); }}>See Tweet</p>
                    </div>
                  )}
                  </div>
                </div>
                <div className='post__icons'>
                  <ChatBubbleOutline />
                  <Repeat />
                  {liked[post.id] ? <Favorite onClick={() => toggleLike(post.id)} /> : <FavoriteBorder onClick={() => toggleLike(post.id)} />}
                  <BarChart />
                  <BookmarkBorder />
                </div>
                <Comments />
              </div>
            </div>
          </div>
        ))}
        </>
      )}
    </>
  )
}

export { Post }