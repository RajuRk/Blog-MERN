import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from '../../context/Context';
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context)
  const PF = 'http://localhost:5000/images/';
  useEffect(()=> {
     const getPost = async()=> {
      const res = await axios.get("/posts/" + path);
      console.log(res.data);
      setPost(res.data);
     }

    getPost()
  },[path]);

  const handledelete = async() => {
      try{
         await axios.delete(`/posts/${post._id}`, {
          data:{ username: user.username },
         });
         window.location.replace("/");
      }catch(err){}
  }

 console.log(post.username === user.username) 
  
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          post.photo && (
            <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />
          )
        }
        
        <h1 className="singlePostTitle">
           {post.title}
           {post.username === user?.username && (
              <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i className="singlePostIcon far fa-trash-alt" onClick={handledelete}></i>
            </div>
           )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
           {post.desc}
        </p>
      </div>
    </div>
  );
}
