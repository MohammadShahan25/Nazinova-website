import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ConstitutionPage from './pages/ConstitutionPage';
import CouncilPage from './pages/CouncilPage';
import PostsPage from './pages/PostsPage';
import ReferencePage from './pages/ReferencePage';
import ConfidentialIntelPage from './pages/ConfidentialIntelPage';
import VotingPage from './pages/VotingPage';
import QuizModal from './components/QuizModal';
import { Post, CouncilMember, Poll } from './types';
import { COUNCIL_MEMBERS_ALL, APP_NAME, HIGH_COUNCIL_QUIZ_QUESTIONS, SAMPLE_POLLS } from './constants';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isHighCouncilAuthenticated, setIsHighCouncilAuthenticated] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(true); // Show quiz initially
  const [quizLocked, setQuizLocked] = useState<boolean>(false); // If quiz failed max attempts
  const [polls, setPolls] = useState<Poll[]>(SAMPLE_POLLS);

  useEffect(() => {
    // Persist auth state in session storage to avoid re-quiz on refresh during the same session
    const storedAuth = sessionStorage.getItem('isHighCouncilAuthenticated');
    if (storedAuth === 'true') {
      setIsHighCouncilAuthenticated(true);
      setShowQuiz(false);
    }
  }, []);

  const addPost = useCallback((newPost: Omit<Post, 'id' | 'timestamp'>) => {
    setPosts(prevPosts => [
      { ...newPost, id: Date.now().toString(), timestamp: new Date() },
      ...prevPosts
    ]);
  }, []);

  const handleAuthSuccess = () => {
    setIsHighCouncilAuthenticated(true);
    setShowQuiz(false);
    setQuizLocked(false);
    sessionStorage.setItem('isHighCouncilAuthenticated', 'true');
  };
  
  const handleAuthFailure = (isFinal: boolean) => {
    if (isFinal) {
      setQuizLocked(true);
      // Quiz remains shown but disabled, or you can hide it and show a lock message
    }
  };

  const handleVote = useCallback((pollId: string, optionId: string) => {
    setPolls(prevPolls => 
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          // Prevent re-voting or implement logic to change vote if needed
          // For now, simple increment
          return {
            ...poll,
            options: poll.options.map(opt => 
              opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            )
          };
        }
        return poll;
      })
    );
  }, []);


  const currentQuizQuestion = HIGH_COUNCIL_QUIZ_QUESTIONS[0]; // Assuming one question for now

  if (showQuiz && !isHighCouncilAuthenticated && currentQuizQuestion && !quizLocked) {
    return <QuizModal question={currentQuizQuestion} onAuthSuccess={handleAuthSuccess} onAuthFailure={handleAuthFailure} />;
  }
  
  if (quizLocked && !isHighCouncilAuthenticated) {
     return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 antialiased">
            <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-red-700 text-center">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
                <p className="text-slate-300 mb-2">You have failed the High Council verification process.</p>
                <p className="text-slate-400 text-sm">Further attempts are locked. Please contact the Minister of Intelligence (MoI) for manual verification and access reinstatement.</p>
            </div>
        </div>
     );
  }


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex antialiased">
      <Navbar isHighCouncilAuthenticated={isHighCouncilAuthenticated} />
      <main className="flex-1 p-4 sm:p-6 md:p-8 ml-16 md:ml-64 transition-all duration-300 ease-in-out overflow-y-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-6">{APP_NAME}</h1>
        <Routes>
          <Route path="/" element={<DashboardPage posts={posts.slice(0,3)} />} />
          <Route path="/constitution" element={<ConstitutionPage />} />
          <Route path="/council" element={<CouncilPage councilMembers={COUNCIL_MEMBERS_ALL} />} />
          <Route path="/posts" element={<PostsPage posts={posts} addPost={addPost} councilMembers={COUNCIL_MEMBERS_ALL} />} />
          <Route path="/reference" element={<ReferencePage />} />
          <Route 
            path="/voting" 
            element={<VotingPage polls={polls} onVote={handleVote} isHighCouncilAuthenticated={isHighCouncilAuthenticated} />} 
          />
          <Route 
            path="/confidential-intel" 
            element={isHighCouncilAuthenticated ? <ConfidentialIntelPage /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
