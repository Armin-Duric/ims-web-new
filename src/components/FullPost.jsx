// src/components/FullPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // If using React Router

const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/blog?id=${id}`)
      .then(r => r.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <div className="container py-5"><p>Loading...</p></div>;

  return (
    <div className="container py-5">
      <article className="bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="display-4 fw-bold text-dark mb-4">{post.title}</h1>
        <p className="text-muted mb-5">
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-lg max-w-none" />
        <a href="/blog" className="btn btn-cyan mt-5">← Back to Blog</a>
      </article>
    </div>
  );
};

export default FullPost;