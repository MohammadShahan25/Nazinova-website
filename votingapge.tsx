import React, { useState } from 'react';
import { Poll, PollOption } from '../types';

interface VotingPageProps {
  polls: Poll[];
  onVote: (pollId: string, optionId: string) => void;
  isHighCouncilAuthenticated: boolean;
}

const VotingPage: React.FC<VotingPageProps> = ({ polls, onVote, isHighCouncilAuthenticated }) => {
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: string}>({});
  const [feedback, setFeedback] = useState<{[key: string]: string}>({});

  const handleOptionChange = (pollId: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [pollId]: optionId }));
    setFeedback(prev => ({ ...prev, [pollId]: ''})); // Clear feedback on new selection
  };

  const castVote = (pollId: string) => {
    const optionId = selectedOptions[pollId];
    if (!optionId) {
      setFeedback(prev => ({ ...prev, [pollId]: 'Please select an option to vote.'}));
      return;
    }
    
    const poll = polls.find(p => p.id === pollId);
    if(poll?.isHighCouncilOnlyVote && !isHighCouncilAuthenticated) {
       setFeedback(prev => ({ ...prev, [pollId]: 'This poll is restricted to High Council members.'}));
       return;
    }

    onVote(pollId, optionId);
    setFeedback(prev => ({ ...prev, [pollId]: 'Your vote has been cast successfully!'}));
  };

  const canVote = (poll: Poll) => {
    return poll.isOpen && (!poll.isHighCouncilOnlyVote || isHighCouncilAuthenticated);
  };

  const getTotalVotes = (poll: Poll) => poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-slate-100 mb-6">Council Polls & Voting</h2>

      {polls.length === 0 && (
        <div className="p-6 bg-slate-800 rounded-lg shadow border border-slate-700">
            <p className="text-slate-400">No active polls at the moment.</p>
        </div>
      )}

      {polls.map(poll => {
        const totalVotes = getTotalVotes(poll);
        return (
          <div key={poll.id} className="mb-8 p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
            <h3 className="text-xl font-semibold text-red-400 mb-2">{poll.question}</h3>
            <p className="text-xs text-slate-500 mb-1">
              Created by: {poll.createdBy} on {new Date(poll.createdAt).toLocaleDateString()}
            </p>
            {poll.isHighCouncilOnlyVote && <p className="text-xs text-amber-500 mb-1">High Council Vote Only</p>}
            <p className={`text-xs mb-4 ${poll.isOpen ? 'text-green-500' : 'text-red-500'}`}>
              Status: {poll.isOpen ? 'Open' : 'Closed'}
            </p>

            <div className="space-y-3 mb-4">
              {poll.options.map(option => (
                <div key={option.id}>
                  <label 
                    htmlFor={`poll-${poll.id}-opt-${option.id}`} 
                    className={`flex items-center p-3 border rounded-md transition-colors duration-200 
                                ${canVote(poll) ? 'cursor-pointer hover:bg-slate-700' : 'cursor-not-allowed opacity-70'}
                                ${selectedOptions[poll.id] === option.id ? 'bg-red-700/50 border-red-600' : 'border-slate-600'}`}
                  >
                    {canVote(poll) && (
                      <input 
                        type="radio" 
                        id={`poll-${poll.id}-opt-${option.id}`} 
                        name={`poll-${poll.id}`} 
                        value={option.id}
                        checked={selectedOptions[poll.id] === option.id}
                        onChange={() => handleOptionChange(poll.id, option.id)}
                        className="form-radio h-4 w-4 text-red-600 bg-slate-600 border-slate-500 focus:ring-red-500 mr-3"
                        disabled={!canVote(poll)}
                      />
                    )}
                    <span className="text-slate-200 flex-grow">{option.text}</span>
                    {poll.isOpen && totalVotes > 0 && (
                       <span className="text-xs text-slate-400 ml-2">
                         ({option.votes} votes, {((option.votes / totalVotes) * 100).toFixed(1)}%)
                       </span>
                    )}
                     {!poll.isOpen && (
                       <span className="text-xs text-slate-400 ml-2">
                         ({option.votes} votes, {totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) + '%' : '0.0%'})
                       </span>
                    )}
                  </label>
                  {!poll.isOpen && totalVotes > 0 && (
                     <div className="w-full bg-slate-600 rounded-full h-1.5 mt-1">
                        <div 
                            className="bg-red-500 h-1.5 rounded-full" 
                            style={{ width: `${(option.votes / totalVotes) * 100}%`}}
                            role="progressbar"
                            aria-valuenow={option.votes}
                            aria-valuemin={0}
                            aria-valuemax={totalVotes}
                            aria-label={`${option.text} vote percentage`}
                        ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {feedback[poll.id] && (
              <p className={`text-sm mb-3 p-2 rounded-md ${feedback[poll.id].includes('successfully') ? 'bg-green-800/50 text-green-300 border border-green-700' : 'bg-red-800/50 text-red-300 border border-red-700'}`}>
                {feedback[poll.id]}
              </p>
            )}

            {canVote(poll) && (
              <button
                onClick={() => castVote(poll.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedOptions[poll.id]}
              >
                Cast Vote
              </button>
            )}
            {!poll.isOpen && <p className="text-sm text-slate-400">This poll is closed. Final results are shown.</p>}
          </div>
        )
      })}
    </div>
  );
};

export default VotingPage;
