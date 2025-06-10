import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { HIGH_COUNCIL_PASSWORD } from '../constants'; // Import the password

interface QuizModalProps {
  question: QuizQuestion;
  onAuthSuccess: () => void;
  onAuthFailure: (isFinal: boolean) => void;
}

const MAX_QUIZ_ATTEMPTS = 3;
const MAX_PASSWORD_ATTEMPTS = 3;

type AuthStep = 'quiz' | 'password';

const QuizModal: React.FC<QuizModalProps> = ({ question, onAuthSuccess, onAuthFailure }) => {
  const [authStep, setAuthStep] = useState<AuthStep>('quiz');
  
  // Quiz state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizError, setQuizError] = useState<string>('');
  const [quizAttempts, setQuizAttempts] = useState(0);

  // Password state
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizError('');

    if (!selectedOption) {
      setQuizError('Please select an answer.');
      return;
    }

    const currentQuizAttempts = quizAttempts + 1;
    setQuizAttempts(currentQuizAttempts);

    if (selectedOption === question.correctAnswer) {
      setAuthStep('password'); // Move to password step
      setQuizError(''); // Clear quiz error
    } else {
      if (currentQuizAttempts >= MAX_QUIZ_ATTEMPTS) {
        setQuizError(`Incorrect. Maximum quiz attempts reached. Access denied.`);
        onAuthFailure(true); // Final failure for quiz
      } else {
        setQuizError(`Incorrect. Please try again. ${MAX_QUIZ_ATTEMPTS - currentQuizAttempts} quiz attempts remaining.`);
        setSelectedOption(null); // Reset selection for next try
        onAuthFailure(false); // Not final failure yet
      }
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!enteredPassword) {
      setPasswordError('Please enter the password.');
      return;
    }
    
    const currentPasswordAttempts = passwordAttempts + 1;
    setPasswordAttempts(currentPasswordAttempts);

    if (enteredPassword === HIGH_COUNCIL_PASSWORD) {
      onAuthSuccess();
    } else {
      if (currentPasswordAttempts >= MAX_PASSWORD_ATTEMPTS) {
        setPasswordError(`Incorrect password. Maximum attempts reached. Access denied.`);
        onAuthFailure(true); // Final failure for password
      } else {
        setPasswordError(`Incorrect password. Please try again. ${MAX_PASSWORD_ATTEMPTS - currentPasswordAttempts} attempts remaining.`);
        setEnteredPassword(''); // Clear password field
        onAuthFailure(false); // Not final failure yet
      }
    }
  };
  
  const isLocked = (authStep === 'quiz' && quizAttempts >= MAX_QUIZ_ATTEMPTS && selectedOption !== question.correctAnswer) ||
                   (authStep === 'password' && passwordAttempts >= MAX_PASSWORD_ATTEMPTS && enteredPassword !== HIGH_COUNCIL_PASSWORD);


  return (
    <div 
      className="fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-red-700 transform transition-all animate-fadeIn">
        <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-bold text-red-500 mb-6 text-center">
          High Council Verification
        </h2>

        {authStep === 'quiz' && (
          <>
            <p className="text-slate-300 mb-1 text-sm">Step 1 of 2: Security Question</p>
            <p className="text-lg text-slate-100 mb-6 font-medium">{question.questionText}</p>
            
            {quizError && <p className="text-red-400 bg-red-900/50 border border-red-700 p-3 rounded-md mb-4 text-sm">{quizError}</p>}

            <form onSubmit={handleQuizSubmit}>
              <div className="max-h-60 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {question.options.map((option, index) => (
                  <label 
                    key={index} 
                    htmlFor={`option-${index}`}
                    className={`block p-3 border rounded-md cursor-pointer transition-all duration-200 ease-in-out text-sm
                                ${selectedOption === option 
                                  ? 'bg-red-600 border-red-500 text-white shadow-lg scale-105' 
                                  : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 text-slate-200'}
                                ${quizAttempts >= MAX_QUIZ_ATTEMPTS ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input 
                      type="radio" 
                      id={`option-${index}`}
                      name="quizOption" 
                      value={option} 
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="sr-only"
                      disabled={quizAttempts >= MAX_QUIZ_ATTEMPTS}
                      aria-describedby={quizError ? "quiz-error-message" : undefined}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={quizAttempts >= MAX_QUIZ_ATTEMPTS}
              >
                Submit Answer
              </button>
            </form>
          </>
        )}

        {authStep === 'password' && (
          <>
            <p className="text-slate-300 mb-1 text-sm">Step 2 of 2: Password Verification</p>
            <p className="text-lg text-slate-100 mb-6 font-medium">Please enter the High Council access password.</p>

            {passwordError && <p id="password-error-message" className="text-red-400 bg-red-900/50 border border-red-700 p-3 rounded-md mb-4 text-sm">{passwordError}</p>}
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-6 relative">
                <label htmlFor="passwordInput" className="sr-only">Password</label>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="passwordInput"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  className="w-full p-3 bg-slate-700 text-slate-100 border border-slate-600 rounded-md focus:ring-red-500 focus:border-red-500 pr-10"
                  placeholder="Enter password"
                  disabled={passwordAttempts >= MAX_PASSWORD_ATTEMPTS}
                  aria-describedby={passwordError ? "password-error-message" : undefined}
                  aria-invalid={!!passwordError}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={passwordAttempts >= MAX_PASSWORD_ATTEMPTS}
              >
                Verify Password
              </button>
            </form>
          </>
        )}
        
        {isLocked && (
            <p className="text-center text-xs text-slate-500 mt-4">Further attempts are locked. Please contact the MoI for manual verification.</p>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
