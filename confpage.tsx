import React from 'react';
import { CONFIDENTIAL_INTEL_MESSAGES } from '../constants';
import { ConfidentialMessage } from '../types';
import { ShieldCheckIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const ConfidentialIntelPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <EyeSlashIcon className="w-10 h-10 text-red-500 mr-3" />
        <h2 className="text-3xl font-bold text-slate-100">Confidential Intel</h2>
      </div>
      
      <p className="text-slate-400 mb-8 italic">
        This section contains highly sensitive information intended for High Council members ONLY.
        Discretion is mandatory. Unauthorized disclosure will be met with the severest penalties under Nazinovan law.
      </p>

      {CONFIDENTIAL_INTEL_MESSAGES.map((message: ConfidentialMessage) => (
        <div key={message.id} className="mb-8 p-6 bg-slate-800 rounded-lg shadow-xl border border-red-700/50 hover:border-red-600 transition-all duration-300">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-semibold text-red-400">{message.title}</h3>
            <span className={`px-3 py-1 text-xs font-bold rounded-full text-white
              ${message.classification === 'TOP SECRET' ? 'bg-red-700' : 
                message.classification === 'HIGH COUNCIL EYES ONLY' ? 'bg-amber-600' : 'bg-sky-600'}`}>
              {message.classification}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-4">Date: {message.date}</p>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{message.content}</p>
          <div className="mt-4 pt-3 border-t border-slate-700 flex items-center text-xs text-slate-500">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            <span>Access Logged. Eyes Only.</span>
          </div>
        </div>
      ))}

      {CONFIDENTIAL_INTEL_MESSAGES.length === 0 && (
         <div className="p-6 bg-slate-800 rounded-lg shadow border border-slate-700">
            <p className="text-slate-400">No confidential intel briefings currently available.</p>
          </div>
      )}
    </div>
  );
};

export default ConfidentialIntelPage;
