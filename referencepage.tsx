
import React from 'react';
import { NATIONAL_SYMBOLS_DATA, PUNISHMENTS_DATA, EMERGENCY_CODES_DATA } from '../constants';
import { ReferenceCategory } from '../types';
import { TagIcon, ShieldExclamationIcon, FireIcon } from '@heroicons/react/24/outline';


const ReferenceSection: React.FC<{ category: ReferenceCategory, icon: React.ReactNode }> = ({ category, icon }) => (
  <section className="mb-8">
    <div className="flex items-center mb-4">
      <span className="mr-3 text-red-400">{icon}</span>
      <h3 className="text-2xl font-semibold text-red-500">{category.title}</h3>
    </div>
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
      {category.isList && category.listItems ? (
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          {category.listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          {category.items.map((item, index) => (
            <li key={index} className="pb-2 border-b border-slate-700 last:border-b-0">
              <span className="font-semibold text-slate-200">{item.name}:</span>
              <p className="text-slate-300 ml-2">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

const ReferencePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-slate-100 mb-8">Quick Reference</h2>
      
      <ReferenceSection category={EMERGENCY_CODES_DATA} icon={<ShieldExclamationIcon className="w-8 h-8" />} />
      <ReferenceSection category={PUNISHMENTS_DATA} icon={<FireIcon className="w-8 h-8" />} />
      <ReferenceSection category={NATIONAL_SYMBOLS_DATA} icon={<TagIcon className="w-8 h-8" />} />
      
    </div>
  );
};

export default ReferencePage;
