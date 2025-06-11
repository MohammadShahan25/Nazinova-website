import React from 'react'; // Removed useState as it's now controlled by App.tsx
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UsersIcon, ChatBubbleLeftEllipsisIcon, ExclamationTriangleIcon, Bars3Icon, XMarkIcon, EyeSlashIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isExpanded, currentPath }) => {
  const isActive = currentPath === to || (to === "/" && currentPath.startsWith("/#")); // Handle HashRouter root
  return (
  <Link
    to={to}
    className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
    aria-label={label}
    aria-current={isActive ? "page" : undefined}
  >
    <span className="w-6 h-6 mr-3 flex-shrink-0">{icon}</span>
    {isExpanded && <span className="font-medium whitespace-nowrap">{label}</span>}
  </Link>
  );
};

interface NavbarProps {
  isHighCouncilAuthenticated: boolean;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

// A simple way to get current path, React Router's useLocation is preferred but needs to be in a Router context.
// For Navbar, if it's outside <HashRouter> in App.tsx structure, it won't have context.
// Assuming Navbar is within Router context as per standard App structure.
// If not, window.location.hash can be a fallback for HashRouter.
import { useLocation } from 'react-router-dom';


const Navbar: React.FC<NavbarProps> = ({ isHighCouncilAuthenticated, isExpanded, setIsExpanded }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className={`fixed top-0 left-0 h-full bg-slate-800 text-white shadow-lg transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-16'} flex flex-col z-40`}>
      <div className="flex items-center justify-between p-3 h-16 border-b border-slate-700">
        {isExpanded && <span className="text-xl font-semibold text-red-500 whitespace-nowrap">FERRONOVA</span>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-slate-300 hover:bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
          aria-expanded={isExpanded}
          aria-controls="main-navigation"
        >
          {isExpanded ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      <nav id="main-navigation" className="flex-grow p-2 overflow-y-auto overflow-x-hidden"> {/* Added overflow-x-hidden */}
        <NavItem to="/" icon={<HomeIcon />} label="Dashboard" isExpanded={isExpanded} currentPath={currentPath} />
        <NavItem to="/constitution" icon={<BookOpenIcon />} label="Constitution" isExpanded={isExpanded} currentPath={currentPath} />
        <NavItem to="/council" icon={<UsersIcon />} label="Council" isExpanded={isExpanded} currentPath={currentPath} />
        <NavItem to="/posts" icon={<ChatBubbleLeftEllipsisIcon />} label="Announcements" isExpanded={isExpanded} currentPath={currentPath} />
        <NavItem to="/voting" icon={<ChartBarIcon />} label="Voting & Polls" isExpanded={isExpanded} currentPath={currentPath} />
        {isHighCouncilAuthenticated && (
          <NavItem to="/confidential-intel" icon={<EyeSlashIcon />} label="Confidential Intel" isExpanded={isExpanded} currentPath={currentPath} />
        )}
        <NavItem to="/reference" icon={<ExclamationTriangleIcon />} label="Quick Reference" isExpanded={isExpanded} currentPath={currentPath} />
      </nav>
      {isExpanded && (
        <div className="p-4 border-t border-slate-700 text-xs text-slate-400 whitespace-nowrap">
          Ferronova Council v1.2
        </div>
      )}
    </aside>
  );
};

export default Navbar;
