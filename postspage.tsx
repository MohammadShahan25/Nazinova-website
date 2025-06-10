
import React, { useState, useCallback } from 'react';
import { Post, CouncilMember } from '../types';
import PostCard from '../components/PostCard';

interface PostsPageProps {
  posts: Post[];
  addPost: (newPost: Omit<Post, 'id' | 'timestamp'>) => void;
  councilMembers: CouncilMember[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts, addPost, councilMembers }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(councilMembers.length > 0 ? councilMembers[0].name : '');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author) {
      setError('All fields (Title, Content, Author) are required.');
      return;
    }
    setError('');
    addPost({ title, content, author });
    setTitle('');
    setContent('');
    // Optionally reset author or keep it for next post
  }, [addPost, title, content, author]);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-slate-100 mb-6">Council Announcements</h2>
      
      <section className="mb-8 p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h3 className="text-xl font-semibold text-red-400 mb-4">Make an Announcement</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 bg-red-100 border border-red-500 p-2 rounded mb-4 text-sm">{error}</p>}
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-1">Author</label>
            <select
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:ring-red-500 focus:border-red-500"
            >
              {councilMembers.map(member => (
                <option key={member.name + member.role} value={member.name}>{member.name} ({member.role})</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Announcement Title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full p-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Detailed announcement..."
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition duration-150 ease-in-out"
          >
            Post Announcement
          </button>
        </form>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-slate-100 mb-4">Posted Announcements</h3>
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-6 bg-slate-800 rounded-lg shadow border border-slate-700">
            <p className="text-slate-400">No announcements have been posted yet.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PostsPage;
