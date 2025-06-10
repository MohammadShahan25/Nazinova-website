
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-slate-800 shadow-lg rounded-lg p-6 mb-6 border border-slate-700">
      <h3 className="text-2xl font-semibold text-red-400 mb-2">{post.title}</h3>
      <p className="text-sm text-slate-400 mb-1">By: {post.author}</p>
      <p className="text-xs text-slate-500 mb-4">
        {new Date(post.timestamp).toLocaleString()}
      </p>
      <p className="text-slate-300 whitespace-pre-wrap">{post.content}</p>
    </div>
  );
};

export default PostCard;
