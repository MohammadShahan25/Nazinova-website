export interface ConstitutionPoint {
  text: string;
  subPoints?: string[];
}

export interface ConstitutionSection {
  title: string;
  content: (string | ConstitutionPoint)[];
  isList?: boolean; // To indicate if content should be rendered as a list
}

export interface ConstitutionArticle {
  id: string;
  title: string;
  preamble?: string; // For preamble within an article, if any
  sections: ConstitutionSection[];
}

export enum CouncilType {
  SUPREME = 'Supreme Council (Permanent)',
  SECONDARY = 'Secondary Council',
  HIERARCHY = 'Government Hierarchy',
  NIB_LEADERSHIP = 'NIB Leadership'
}

export interface CouncilMember {
  name: string;
  role: string;
  councilType: CouncilType;
  details?: string;
}

export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: Date;
}

export interface NIBOverviewData {
  motto: string;
  purpose: string;
  leadership: { name: string; role: string }[];
  primaryObjectives: string[];
  specialProtocol: string;
}

export interface ReferenceItem {
  name: string;
  description: string;
}

export interface ReferenceCategory {
  title: string;
  items: ReferenceItem[];
  isList?: boolean; // if descriptions are just points
  listItems?: string[]; // for simple list items
}

export interface RoleTitle {
  abbr: string;
  full: string;
}

// New Types for Quiz, Confidential Intel, and Polls

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[]; // Should contain 30 options
  correctAnswer: string;
}

export interface ConfidentialMessage {
  id: string;
  title: string;
  content: string;
  classification: 'TOP SECRET' | 'HIGH COUNCIL EYES ONLY' | 'INTERNAL MEMO';
  date: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isOpen: boolean;
  createdBy: string; // Council member name
  createdAt: Date;
  isHighCouncilOnlyVote?: boolean; // If true, only authenticated High Council can vote
}
