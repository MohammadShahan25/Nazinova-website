import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UsersIcon, ChatBubbleLeftEllipsisIcon, ExclamationTriangleIcon, Bars3Icon, XMarkIcon, EyeSlashIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isExpanded }) => (
  <Link
    to={to}
    className="flex items-center p-3 my-1 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200"
    aria-label={label}
  >
    <span className="w-6 h-6 mr-3 flex-shrink-0">{icon}</span>
    {isExpanded && <span className="font-medium whitespace-nowrap">{label}</span>}
  </Link>
);

interface NavbarProps {
  isHighCouncilAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isHighCouncilAuthenticated }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className={`fixed top-0 left-0 h-full bg-slate-800 text-white shadow-lg transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-16'} flex flex-col z-40`}>
      <div className="flex items-center justify-between p-3 h-16 border-b border-slate-700">
        {isExpanded && <span className="text-xl font-semibold text-red-500 whitespace-nowrap">NAZINOVA</span>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-slate-300 hover:bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      <nav className="flex-grow p-2 overflow-y-auto overflow-x-hidden"> {/* Added overflow-x-hidden */}
        <NavItem to="/" icon={<HomeIcon />} label="Dashboard" isExpanded={isExpanded} />
        <NavItem to="/constitution" icon={<BookOpenIcon />} label="Constitution" isExpanded={isExpanded} />
        <NavItem to="/council" icon={<UsersIcon />} label="Council" isExpanded={isExpanded} />
        <NavItem to="/posts" icon={<ChatBubbleLeftEllipsisIcon />} label="Announcements" isExpanded={isExpanded} />
        <NavItem to="/voting" icon={<ChartBarIcon />} label="Voting & Polls" isExpanded={isExpanded} />
        {isHighCouncilAuthenticated && (
          <NavItem to="/confidential-intel" icon={<EyeSlashIcon />} label="Confidential Intel" isExpanded={isExpanded} />
        )}
        <NavItem to="/reference" icon={<ExclamationTriangleIcon />} label="Quick Reference" isExpanded={isExpanded} />
      </nav>
      {isExpanded && (
        <div className="p-4 border-t border-slate-700 text-xs text-slate-400 whitespace-nowrap">
          Nazinova Council v1.1
        </div>
      )}
    </aside>
  );
};

export default Navbar;
