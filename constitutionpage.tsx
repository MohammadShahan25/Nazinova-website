
import React from 'react';
import { CONSTITUTION_PREAMBLE, CONSTITUTION_ARTICLES, CONSTITUTION_CONCLUSION, NIB_DATA } from '../constants';
import ArticleAccordion from '../components/ArticleAccordion';
import { NIBOverviewData } from '../types';

const NIBOverviewCard: React.FC<{ nibData: NIBOverviewData }> = ({ nibData }) => (
  <div className="mt-8 p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
    <h2 className="text-2xl font-bold text-red-500 mb-4">National Intelligence Bureau (NIB) – Overview</h2>
    <p className="italic text-slate-400 mb-3">{nibData.motto}</p>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-200 mb-1">Purpose:</h3>
      <p className="text-slate-300">{nibData.purpose}</p>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-200 mb-1">Leadership:</h3>
      <ul className="list-disc list-inside text-slate-300">
        {nibData.leadership.map(leader => (
          <li key={leader.name}>{leader.name}: {leader.role}</li>
        ))}
      </ul>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-200 mb-1">Primary Objectives:</h3>
      <ul className="list-disc list-inside text-slate-300">
        {nibData.primaryObjectives.map(obj => (
          <li key={obj}>{obj}</li>
        ))}
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-1">Special Protocol:</h3>
      <p className="text-slate-300">{nibData.specialProtocol}</p>
    </div>
  </div>
);

const ConstitutionPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-slate-100 mb-6">The Constitution of Ferronova</h2>
      
      <div className="mb-6 p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h3 className="text-xl font-semibold text-red-400 mb-3">Preamble</h3>
        <p className="text-slate-300 italic">{CONSTITUTION_PREAMBLE}</p>
      </div>

      {CONSTITUTION_ARTICLES.map((article, index) => (
        <ArticleAccordion key={article.id} article={article} defaultOpen={index === 0} />
      ))}
      
      <div className="mt-6 p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <p className="text-slate-300 italic">{CONSTITUTION_CONCLUSION}</p>
      </div>

      <NIBOverviewCard nibData={NIB_DATA} />
    </div>
  );
};

export default ConstitutionPage;
