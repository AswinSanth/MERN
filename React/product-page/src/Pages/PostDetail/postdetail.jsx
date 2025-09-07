import './postdetail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PostDetail = () => {
  const { postid } = useParams();
  const [postData, setPostData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [userData, setUserData] = useState({});
  const fetchData = async () => {
    const res1 = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postid}`
    );
    const data1 = await res1.json();
    setPostData(data1);
    const res2 = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postid}`
    );
    const data2 = await res2.json();
    setCommentData(data2);
    const res3 = await fetch(
      `https://jsonplaceholder.typicode.com/users/${data1.userId}`
    );
    const data3 = await res3.json();
    setUserData(data3);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="postDetails">

      <div className="arun">
       <div className="post">
       <h2>Post Details</h2>
      <h3> post Id:{postData.id}</h3>
      <p>Title :{postData.title}</p>
      <p>Descrition{postData.body}</p>
      <p>Userid:{postData.userId}</p>

       </div>
       <div className="user">
      <h2>User Deatails</h2>
      <h3>UserId :{userData.id}</h3>
      <p>email {userData.email}</p>
      <p>Username{userData.username}</p>
      <p>address {userData.address?.street}</p>
      <p>{userData.address?.suite}</p>
      <p>{userData.address?.city}</p>
      <p>{userData.address?.zipcode}</p>
      <p>{userData.address?.geo?.lat}</p>
      <p>{userData.address?.geo?.lng}</p>
      <p> phone {userData.phone}</p>
      <p>website {userData.website}</p>
       </div>
       </div>
        <h2>COMMENTS</h2>

      <div className="comments">
       
       { commentData.map(item=>{
        return(
        <div className="commentlist">
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.email}</p>
          <p>{item.body}</p>

        </div>
        )
       })}
      </div>
    </div>
  );
};
export default PostDetail;
