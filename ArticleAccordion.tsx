
import React, { useState } from 'react';
import { ConstitutionArticle, ConstitutionSection, ConstitutionPoint } from '../types';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ArticleAccordionProps {
  article: ConstitutionArticle;
  defaultOpen?: boolean;
}

const ArticleAccordion: React.FC<ArticleAccordionProps> = ({ article, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const renderContentItem = (item: string | ConstitutionPoint, index: number) => {
    if (typeof item === 'string') {
      return <p key={index} className="mb-2 text-slate-300">{item}</p>;
    }
    return (
      <div key={index} className="mb-2 text-slate-300">
        <p>{item.text}</p>
        {item.subPoints && (
          <ul className="list-disc list-inside ml-4 mt-1 text-slate-400">
            {item.subPoints.map((subPoint, subIndex) => (
              <li key={subIndex}>{subPoint}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  const renderSectionContent = (section: ConstitutionSection) => {
    if (section.isList) {
      return (
        <ul className="list-disc list-inside ml-4 text-slate-300">
          {section.content.map((item, index) => (
            <li key={index} className="mb-1">
              {typeof item === 'string' ? item : item.text /* Simplified for list items */}
              {typeof item !== 'string' && item.subPoints && (
                <ul className="list-disc list-inside ml-6 mt-1 text-slate-400">
                  {item.subPoints.map((subPoint, subIndex) => (
                    <li key={subIndex}>{subPoint}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
    }
    return section.content.map(renderContentItem);
  };


  return (
    <div className="mb-4 bg-slate-800 rounded-lg shadow border border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left text-xl font-semibold text-red-400 hover:bg-slate-700 rounded-t-lg focus:outline-none"
      >
        {article.title}
        {isOpen ? <ChevronDownIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-slate-700">
          {article.preamble && <p className="italic text-slate-400 mb-4">{article.preamble}</p>}
          {article.sections.map((section, index) => (
            <div key={index} className="mb-4">
              {section.title && <h4 className="text-lg font-semibold text-slate-200 mb-2">{section.title}</h4>}
              <div className="prose prose-sm prose-invert max-w-none">
                {renderSectionContent(section)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleAccordion;
