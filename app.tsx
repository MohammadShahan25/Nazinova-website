import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import QuizModal from './components/QuizModal';

// Pages
import DashboardPage from './pages/DashboardPage';
import ConstitutionPage from './pages/ConstitutionPage';
import CouncilPage from './pages/CouncilPage';
import PostsPage from './pages/PostsPage';
import ReferencePage from './pages/ReferencePage';
import ConfidentialIntelPage from './pages/ConfidentialIntelPage';
import VotingPage from './pages/VotingPage';

// Data and Types
import { Post, CouncilMember, QuizQuestion, Poll } from './types';
import { HIGH_COUNCIL_QUIZ_QUESTIONS, COUNCIL_MEMBERS_ALL, SAMPLE_POLLS } from './constants';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [councilMembers] = useState<CouncilMember[]>(COUNCIL_MEMBERS_ALL);
  const [polls, setPolls] = useState<Poll[]>(SAMPLE_POLLS);

  const [isHighCouncilAuthenticated, setIsHighCouncilAuthenticated] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(true); // Default to expanded

  const navigate = useNavigate();
  const location = useLocation();

  // Load data from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem('ferronova-posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts).map((p: Post) => ({...p, timestamp: new Date(p.timestamp)})));
    }
    const storedPolls = localStorage.getItem('ferronova-polls');
    if (storedPolls) {
      setPolls(JSON.parse(storedPolls).map((p: Poll) => ({...p, createdAt: new Date(p.createdAt)})));
    }
    // Check persisted auth state
    if (sessionStorage.getItem('ferronova-hc-auth') === 'true') {
      setIsHighCouncilAuthenticated(true);
    }
  }, []);

  // Save posts and polls to localStorage
  useEffect(() => {
    localStorage.setItem('ferronova-posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('ferronova-polls', JSON.stringify(polls));
  }, [polls]);

  // Persist auth state in session storage
   useEffect(() => {
      if (isHighCouncilAuthenticated) {
          sessionStorage.setItem('ferronova-hc-auth', 'true');
      } else {
          sessionStorage.removeItem('ferronova-hc-auth');
      }
  },[isHighCouncilAuthenticated]);

  const addPost = useCallback((newPostData: Omit<Post, 'id' | 'timestamp'>) => {
    const newPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      timestamp: new Date(),
    };
    setPosts(prevPosts => [newPost, ...prevPosts].sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()));
  }, []);

  const handleVote = useCallback((pollId: string, optionId: string) => {
    setPolls(prevPolls => prevPolls.map(poll => {
      if (poll.id === pollId && poll.isOpen) { // Ensure poll is open
        const optionExists = poll.options.some(opt => opt.id === optionId);
        if (!optionExists) return poll; // Invalid option
        
        // Prevent double voting if needed (more complex state, for now allow re-vote to change)
        // This simple version just increments.
        return {
          ...poll,
          options: poll.options.map(opt => 
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          )
        };
      }
      return poll;
    }));
  }, []);
  
  // Quiz and Authentication Logic
  useEffect(() => {
    const confidentialPath = '/confidential-intel';
    if (location.pathname === confidentialPath && !isHighCouncilAuthenticated) {
      // Check if auth attempt previously failed hard to prevent quiz loop
      if (sessionStorage.getItem('ferronova-hc-auth-final-fail') !== 'true') {
        setShowQuiz(true);
      } else {
         // If final fail and trying to access, redirect
        if (location.pathname === confidentialPath) navigate('/');
      }
    } else if (location.pathname !== confidentialPath && showQuiz) {
      // If navigating away from confidential page while quiz is up, consider hiding it
      // setShowQuiz(false); // Let QuizModal handle its own visibility mostly or use explicit close
    }
  }, [location.pathname, isHighCouncilAuthenticated, navigate, showQuiz]);


  const handleAuthSuccess = () => {
    setIsHighCouncilAuthenticated(true);
    setShowQuiz(false);
    sessionStorage.removeItem('ferronova-hc-auth-final-fail');
    // If auth was triggered by navigating to confidential-intel, stay or navigate there
    if (location.pathname !== '/confidential-intel') {
       navigate('/confidential-intel');
    }
  };

  const handleAuthFailure = (isFinal: boolean) => {
    if (isFinal) {
      setIsHighCouncilAuthenticated(false); // Ensure it's false
      setShowQuiz(false);
      sessionStorage.setItem('ferronova-hc-auth-final-fail', 'true');
      if (location.pathname === '/confidential-intel') {
        navigate('/'); // Redirect to home on final auth failure if on protected page
      }
    }
    // Non-final failures are handled by QuizModal's internal error messages
  };

  const quizQuestion = HIGH_COUNCIL_QUIZ_QUESTIONS[0]; // Assuming one question

  return (
    <div className="flex h-screen">
      <Navbar 
        isHighCouncilAuthenticated={isHighCouncilAuthenticated}
        isExpanded={isNavbarExpanded}
        setIsExpanded={setIsNavbarExpanded} // Pass setter to Navbar
      />
      {showQuiz && !isHighCouncilAuthenticated && quizQuestion && (
        <QuizModal
          question={quizQuestion}
          onAuthSuccess={handleAuthSuccess}
          onAuthFailure={handleAuthFailure}
        />
      )}
      <main 
        className={`flex-grow pt-16 overflow-y-auto bg-slate-900 transition-all duration-300 ease-in-out ${isNavbarExpanded ? 'md:ml-64' : 'md:ml-16'}`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardPage posts={posts.slice(0, 3)} />} />
            <Route path="/constitution" element={<ConstitutionPage />} />
            <Route path="/council" element={<CouncilPage councilMembers={councilMembers} />} />
            <Route path="/posts" element={<PostsPage posts={posts} addPost={addPost} councilMembers={councilMembers} />} />
            <Route path="/voting" element={<VotingPage polls={polls} onVote={handleVote} isHighCouncilAuthenticated={isHighCouncilAuthenticated} />} />
            <Route path="/reference" element={<ReferencePage />} />
            <Route
              path="/confidential-intel"
              element={
                isHighCouncilAuthenticated ? (
                  <ConfidentialIntelPage />
                ) : (
                  // Effect will show quiz, or if quiz is bypassed/failed hard, redirect
                  // This Navigate is a fallback if quiz doesn't show or is dismissed by final fail
                  <Navigate to="/" replace state={{ from: location, message: "Authentication required for confidential intel." }} />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback to dashboard */}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
