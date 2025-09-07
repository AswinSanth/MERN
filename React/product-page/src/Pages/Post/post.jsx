import './post.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Post = () => {
  const [postData, setPostData] = useState([]);
  const navi=useNavigate();

  const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    setPostData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="posts">
      <div className="box">
        {postData.map(item => {
            return(
          <div className="postlist"
          onClick={()=>{
            navi(`/postdetail/${item.id}`)
          }}>

            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>)

        })}
      </div>
    </div>
  );
};
export default Post;
