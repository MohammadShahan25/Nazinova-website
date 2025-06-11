
import React from 'react';
import { CouncilMember, RoleTitle, CouncilType } from '../types';
import { ROLES_AND_TITLES_DATA } from '../constants';
import { UserGroupIcon, AcademicCapIcon, ShieldCheckIcon, EyeIcon } from '@heroicons/react/24/outline';

interface CouncilPageProps {
  councilMembers: CouncilMember[];
}

const CouncilCard: React.FC<{ member: CouncilMember }> = ({ member }) => {
  let icon;
  switch(member.councilType) {
    case CouncilType.SUPREME: icon = <AcademicCapIcon className="w-6 h-6 text-amber-400" />; break;
    case CouncilType.SECONDARY: icon = <UserGroupIcon className="w-6 h-6 text-sky-400" />; break;
    case CouncilType.HIERARCHY: icon = <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />; break;
    case CouncilType.NIB_LEADERSHIP: icon = <EyeIcon className="w-6 h-6 text-purple-400" />; break;
    default: icon = <UserGroupIcon className="w-6 h-6 text-slate-400" />;
  }

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-xl font-semibold text-slate-100 ml-2">{member.name}</h3>
      </div>
      <p className="text-red-400 font-medium">{member.role}</p>
      <p className="text-xs text-slate-500 mt-1">{member.councilType}</p>
      {member.details && <p className="text-xs text-slate-400 mt-1 italic">{member.details}</p>}
    </div>
  );
};

const CouncilPage: React.FC<CouncilPageProps> = ({ councilMembers }) => {
  const councilTypes = Object.values(CouncilType);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-slate-100 mb-6">Ferronova Council Directory</h2>

      {councilTypes.map(type => {
        const membersOfType = councilMembers.filter(cm => cm.councilType === type);
        if (membersOfType.length === 0) return null;
        return (
          <section key={type} className="mb-8">
            <h3 className="text-2xl font-semibold text-red-500 mb-4">{type}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {membersOfType.map(member => (
                <CouncilCard key={member.name + member.role} member={member} />
              ))}
            </div>
          </section>
        );
      })}
      
      <section className="mt-10">
        <h3 className="text-2xl font-semibold text-red-500 mb-4">Official Roles and Titles (from Article IX)</h3>
        <div className="bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700">
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {ROLES_AND_TITLES_DATA.map((role: RoleTitle) => (
              <li key={role.abbr}><span className="font-semibold">{role.abbr}:</span> {role.full}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CouncilPage;
