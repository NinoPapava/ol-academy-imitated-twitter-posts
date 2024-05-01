import {useState, useEffect} from 'react'

const Comments = ({postId}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const commentsData = await response.json();
      setComments(commentsData);
    };
    fetchComments();
  }, [postId]);

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <strong>{comment.name}</strong> - {comment.body}
        </li>
      ))}
    </ul>
  );
}

export {Comments}