// src/components/FullPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog?id=${id}`)
      .then(r => r.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="text-cyan-300 fs-3">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger fs-3">Post not found</p>
        <Link to="/blog" className="btn btn-cyan mt-3">Back to Blog</Link>
      </div>
    );
  }

  // THIS IS THE KEY FIX – safely parse the date
  const postDate = new Date(post.date || post.created_at || Date.now());
  const formattedDate = isNaN(postDate.getTime())
    ? 'Date unavailable'
    : postDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <div className="container py-5">
      <article className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
        <h1 className="display-4 fw-bold text-dark mb-4">{post.title}</h1>
        <p className="text-muted fs-5 mb-5">
          {formattedDate} • by {post.author || 'IMS Team'}
        </p>

        {/* Full content with proper styling */}
        <div 
          className="prose prose-lg max-w-none text-dark"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <div className="mt-8">
          <Link to="/blog" className="btn btn-cyan px-5 py-3">
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
};

export default FullPost;