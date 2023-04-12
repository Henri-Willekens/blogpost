import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './View.css';
import axios from 'axios';

const View = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog(id);
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const response = await axios.get(`http://localhost:5000/blog/${id}`);
    if (response.status === 200) {
      setBlog({ ...response.data[0] });
    }
  };

  const blogLink = `http://localhost:5000/blogs?id=${id}`;

  return (
    <div style={{ marginTop: '150px' }}>
      <div className="card">
        <div className="card-header">
          <span>Title: {blog && blog.title}</span>
        </div>
        <div className="container">
          <span>{blog && blog.body}</span>
        </div>
        <div className="body">
          <span>Made by: {blog && blog.contact}</span>
        </div>
        <div className="blog-link">View blog post uri with 
          <Link to={blogLink}> id={id}</Link>
        </div>
        <Link to="/">
          <button className="btn">Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
