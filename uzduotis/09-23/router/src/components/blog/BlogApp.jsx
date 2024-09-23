import { useState, useEffect } from 'react';
import NewPost from './components/new-post/NewPost';
import Post from './components/post/Post';
import Search from './components/header/search/Search';
import Social from './components/header/socials/Social';
import Navigation from './components/header/navigation/Navigation'
import './BlogApp.css';

function BlogApp() {
  const [posts, setPosts] = useState([]); 


  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts)); 
    }
  }, []);

  const addPost = (newPost) => {
    const updatedPosts = [...posts, newPost]; 
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); 
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row d-flex justify-content-between align-items-center text-center border-bottom pb-4">
          <div className="col-1"><Search/></div>
          <div className="col-8 logo m-0 text-uppercase"><a href="">MagDesign</a></div>
          <div className="col-1"><Social/></div>
          <div className="col-1"><Navigation/></div>
        </div>
        <div className="row">
          {posts.map((post, index) => (
            <Post key={index} postData={post} /> 
          ))}
        </div>
        <div className="row">
          <NewPost addPost={addPost} /> 
        </div>
      </div>
    </>
  );
}

export default BlogApp;
