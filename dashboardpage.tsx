
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import { BookOpenIcon, UsersIcon, ChatBubbleLeftEllipsisIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';


interface DashboardPageProps {
  posts: Post[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ posts }) => {
  const quickLinks = [
    { to: "/constitution", label: "View Constitution", icon: <BookOpenIcon className="w-8 h-8 mb-2 text-red-400" /> },
    { to: "/council", label: "Council Directory", icon: <UsersIcon className="w-8 h-8 mb-2 text-red-400" /> },
    { to: "/posts", label: "Post Announcement", icon: <ChatBubbleLeftEllipsisIcon className="w-8 h-8 mb-2 text-red-400" /> },
    { to: "/reference", label: "Quick Reference", icon: <ExclamationTriangleIcon className="w-8 h-8 mb-2 text-red-400" /> },
  ];

  return (
    <div className="animate-fadeIn">
      <section className="mb-8 p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">Welcome, Council Member</h2>
        <p className="text-slate-300">
          This dashboard provides access to the Constitution of Nazinova, council member information, announcement capabilities, and quick references to essential codes and procedures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg shadow-md border border-slate-700 flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105"
            >
              {link.icon}
              <span className="text-slate-200 font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">Recent Announcements</h2>
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-6 bg-slate-800 rounded-lg shadow border border-slate-700">
            <p className="text-slate-400">No announcements yet.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;

// Basic fadeIn animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
