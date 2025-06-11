
import { ConstitutionArticle, CouncilMember, NIBOverviewData, ReferenceCategory, RoleTitle, CouncilType, QuizQuestion, ConfidentialMessage, Poll, PollOption } from './types';

export const APP_NAME = "Ferronova Council Dashboard";

export const CONSTITUTION_PREAMBLE = "We, the people of Ferronova, in the pursuit of justice, order, and prosperity, establish this constitution to guide our governance, protect our rights, and promote the welfare of our nation. We hereby set forth the following laws, rights, and responsibilities to ensure that all citizens, regardless of status, are treated equally under the law, and that the leadership serves the best interests of the people.";

export const CONSTITUTION_ARTICLES: ConstitutionArticle[] = [
  {
    id: "article-i",
    title: "Article I: The Laws of Ferronova",
    sections: [
      { title: "Section 1: Snitching Rule", content: ["If a person snitches on someone, the other is allowed to snitch back in retaliation."] },
      { title: "Section 2: Taxation", content: [
          "Tax must be paid weekly to the High Council members in small amounts of food of the council member’s choice.",
          "If a citizen fails to pay taxes twice, one of their valued possessions or accessories will be confiscated for a week.",
          "Taxes can be collected daily in small portions or as one large portion on Fridays."
        ], isList: true
      },
      { title: "Section 3: Conquering Unclaimed Land", content: ["Any member who steps onto unclaimed land has the right to conquer it. This applies even to spies. If backup is required, the entire government must assist."] },
      { title: "Section 4: Defense Against Attacks", content: ["If any member is attacked, physically or mentally, all other members and volunteer civilians must provide support and aid."] },
      { title: "Section 5: Betrayal", content: ["Civilians who betray the nation of Ferronova shall face the second-worst punishment in the kingdom: The Fadhil Treatment."] }
    ]
  },
  {
    id: "article-ii",
    title: "Article II: Electoral Process",
    sections: [
      { title: "Section 1: Regular Elections", content: [
          { text: "Frequency of Elections:", subPoints: ["Elections for the President and Vice President will be held every unit.", "All eligible citizens may run for office, and the voting process must be conducted anonymously."] },
          { text: "Process for the President:", subPoints: ["The candidate who receives the most votes will become President.", "If a candidate wins the presidency with a majority, a runoff election will be held for the Vice President between the second-place presidential candidate and the highest vote-getter among the vice-presidential candidates."] },
          { text: "Special Elections:", subPoints: ["If both the President and Vice President are removed (via impeachment or other means), new elections will be held for both positions within three days of the vacancy."] },
          { text: "Standing for Election:", subPoints: ["Any eligible member of the High or Low Council, or any other citizen, may stand for election to the office of President or Vice President.", "If an individual runs for the presidency or vice-presidency and loses, the losing candidate will take the position of the runner-up (in the council or government) until another election."] }
        ]
      },
      { title: "Section 2: Voting Process and Points System", content: [
          "Every citizen, regardless of status, has the right to vote.",
          { text: "Point System for Voting:", subPoints: ["High and Low Council members’ votes will be worth 5 points.", "Civilian votes will be worth 2 points.", "Slaves’ votes will be worth 1 point."] },
          "Votes will be tallied to determine the winner of the election."
        ], isList: true
      }
    ]
  },
  {
    id: "article-iii",
    title: "Article III: Supreme Council Members",
    sections: [
      { title: "Section 1: Permanent Supreme Council Members, they cannot be removed", content: [
        "Shahan: Minister of Intelligence (MoI) and Director of NIB (DoNIB)",
        "Abhav: Minister of Military (MoM)",
        "Ehan: Advisor (AD) and Military Operations (MOP)",
        "Hamdan: Representative of Nation (RoN)",
        "Samrat: Minister of Torture (MoT)",
        "Amaan: The GOAT (Above @ll)",
        "Arnav: Minister of Sports and Games (MoSaG)"
        ], isList: true
      },
      { title: "Section 2: Secondary Council Members", content: [
        "Abel: Spy",
        "Eshaan: Spy",
        "Sara: Minister of Events",
        "Haneen: Minister of Import and Export",
        "Kashvi: Spy"
        ], isList: true
      }
    ]
  },
  {
    id: "article-iv",
    title: "Article IV: Conditions for Removing Secondary Council Members",
    sections: [
      { title: "", content: [ 
          "They must have violated at least 3 laws and triggered any 5 codes.",
          "Removal must be unanimously approved by all High Council members. If even one member disapproves, the person remains in office.",
          "If they fail to fulfill their duties three consecutive times, they will be automatically removed."
        ], isList: true
      }
    ]
  },
  {
    id: "article-v",
    title: "Article V: National Symbols",
    sections: [
       { title: "", content: [
        "Animal: Lion",
        "Bird: Peacock",
        "Sport: Football",
        "Prisoners: Agraj",
        "Government Type: Democracy (imperfect)",
        "Song: ‘I’m Gonna Fly Some Planes’ by Rucka Rucka Ali",
        "Anthem: Nazi Anthem by Adølf Hĩtler", // Note: This remains as per original, user did not ask to change anthem.
        { text: "Flag: The ReBirth", subPoints: ["White: Peace", "Black: Bravery", "Red: Violence and Bloodshed"] }
        ], isList: true
      }
    ]
  },
  {
    id: "article-vi",
    title: "Article VI: Punishments (From Worst to Bad)",
    sections: [
      { title: "", content: [
          "1. Brazen Bull: The punished shall be disciplined by the entire High Council and struck multiple times.",
          "2. The Fadhil Treatment: The individual shall be tortured by Fadhil.",
          "3. The Cooked Chicken: The punished loses all rights and will be repeatedly snitched upon.",
          "4. The Elephant’s Tooth: The punished will be verbally roasted against a wall without the right to respond, either verbally or physically.",
          "5. The Darkhall Blade: A piece of the individual’s hair shall be cut by the MoI."
        ], isList: false 
      }
    ]
  },
  {
    id: "article-vii",
    title: "Article VII: Emergency Codes",
    sections: [
      { title: "", content: [
        "Code Unicorn: Aarav is approaching",
        "Code Magnus: Teacher is nearby",
        "Code Extremus: Teacher for the specific periods is nearby",
        "Code Abort: SLT Member is nearby (Ms. Venetia, Ms. Fatima, etc.)",
        "Code Doom: We are being snitched on",
        "Code Vader: A government member is using power for their own good and is starting rebellion",
        "Code Frick: Someone has reminded teacher about completion work",
        "Code Skibidi: Shipping has occurred in Ferronova borders",
        "Code COD: A government member’s rights have been violated (entire country must fight the violator)",
        "Code Diddy: Someone’s being SUS",
        "Code Sundar: Hindi teacher is nearby"
        ], isList: true
      }
    ]
  },
  {
    id: "article-viii",
    title: "Article VIII: Hierarchy of Government",
    sections: [
      { title: "", content: [
        "1. Reyansh (President)",
        "2. Eisa (Vice President)",
        "3. Shahan (MoI) and (DoNIB)",
        "4. Ehan (Advisor)",
        "5. Muaz (MoS)",
        "6. Idhant (VMoS)",
        "7. Hamdan (RoN)",
        "8. Eeshan (SS), (Ro6B)",
        "9. Abel (S)"
        ], isList: false 
      }
    ]
  },
  {
    id: "article-ix",
    title: "Article IX: Roles and Titles",
    sections: [
      { title: "", content: [
        "(MoI): Minister of Intelligence",
        "(MoS): Minister of Security",
        "(RoN): Representative of Nation",
        "(SS): Secretary Spy",
        "(Ro6B): Representative of 6B",
        "(S): Spy",
        "(LS): Lowly Spy",
        "(DoNIB): Director of National Intelligence Bureau"
        ], isList: true
      }
    ]
  },
  {
    id: "article-x",
    title: "Article X: Judicial System (Court of Ferronova)",
    sections: [
      { title: "Section 1: Structure and Authority", content: [
        "The Court of Ferronova shall serve as the supreme legal body, empowered to interpret the laws, resolve disputes, and ensure justice is delivered with fairness (and occasional dramatic flair).",
        "The court shall operate independently of the Executive and Intelligence branches, but may consult the NIB for classified intel if necessary."
        ], isList: true
      },
      { title: "Section 2: The Head Judge", content: [
        "Judge Dread, the Honorable and Unyielding, shall preside over all legal proceedings as Head Judge of Ferronova.",
        "Judge Dread’s word shall be final—unless countered with the rare and powerful Reverse Uno (see Section 4)."
        ], isList: true
      },
      { title: "Section 3: Trial Procedure", content: [
        { text: "Citizens, spies, or even council members may request a trial if they believe they have been:", subPoints: ["Wrongly accused or punished.", "Denied a right.", "Snitched on unjustly."] },
        { text: "Trials shall be public, conducted in the Court of Roasting, where:", subPoints: ["Evidence will be presented (yes, even screenshots and voice notes count).", "Witnesses may testify.", "Cross-snitching is allowed once per party."] },
        "A majority vote by present Council Members will determine the verdict. In case of a tie, Judge Dread delivers the final judgment."
        ], isList: true
      },
      { title: "Section 4: The Sacred “Reverse Uno”", content: [
        { text: "Each citizen holds a one-time sacred right to use the Reverse Uno:", subPoints: ["It allows a punished individual to reverse the verdict and put the accuser on trial immediately.", "The Reverse Uno must be used dramatically (bonus points for slamming a fake card on the table).", "After usage, the right is permanently gone unless granted again by High Council decree.", "If the Reverse Uno trial ends with the reversal being unjustified, the original punishment is doubled."] }
        ], isList: true
      },
      { title: "Section 5: Special Trials", content: [
        "High Crimes (betrayal, rebellion, or corruption) may invoke the Trial of the Elders, where only the Permanent Supreme Council Members vote.",
        "Punishments from these trials may include any from Article VI, depending on severity."
        ], isList: true
      }
    ]
  }
];

export const NIB_DATA: NIBOverviewData = {
  motto: "“Eyes Everywhere, Secrets Nowhere.”",
  purpose: "The National Intelligence Bureau (NIB) is the nation’s top intelligence agency, responsible for gathering, analyzing, and acting on critical security information. It handles espionage, counterintelligence, cyber warfare, and covert operations to protect Ferronova from threats.",
  leadership: [
    { name: "Mohammad Shahan Khan", role: "Director (Minister of Intelligence & Operations)" }, // Assuming DoNIB role description updates via ROLES_AND_TITLES_DATA if displayed directly from here
    { name: "Ehan", role: "Manager (Advisor)" },
    { name: "Abhav", role: "The Enactor (MoM)" }
  ],
  primaryObjectives: [
    "Gather intelligence on domestic and foreign threats.",
    "Provide strategic information to FIST for military operations.",
    "Conduct espionage and counterintelligence.",
    "Infiltrate and dismantle enemy organizations."
  ],
  specialProtocol: "NIB operates in secrecy, with only the High Council and FIST commanders having access to its classified files. It has the authority to override other governmental bodies in cases of extreme national threat."
};

const supremeCouncilRaw: Omit<CouncilMember, 'councilType'>[] = [
  { name: "Shahan", role: "Minister of Intelligence (MoI) and Director of NIB (DoNIB)"},
  { name: "Abhav", role: "Minister of Military (MoM)"},
  { name: "Ehan", role: "Advisor (AD) and Military Operations (MOP)"},
  { name: "Hamdan", role: "Representative of Nation (RoN)"},
  { name: "Samrat", role: "Minister of Torture (MoT)"},
  { name: "Amaan", role: "The GOAT (Above @ll)"},
  { name: "Arnav", role: "Minister of Sports and Games (MoSaG)"}
];

const secondaryCouncilRaw: Omit<CouncilMember, 'councilType'>[] = [
  { name: "Abel", role: "Spy"},
  { name: "Eshaan", role: "Spy"}, 
  { name: "Sara", role: "Minister of Events"},
  { name: "Haneen", role: "Minister of Import and Export"},
  { name: "Kashvi", role: "Spy"}
];

const governmentHierarchyRaw: Omit<CouncilMember, 'councilType'>[] = [
  { name: "Reyansh", role: "President"},
  { name: "Eisa", role: "Vice President"},
  { name: "Shahan", role: "MoI and DoNIB"}, 
  { name: "Ehan", role: "Advisor"}, 
  { name: "Muaz", role: "MoS"},
  { name: "Idhant", role: "VMoS"},
  { name: "Hamdan", role: "RoN"}, 
  { name: "Eeshan", role: "SS, Ro6B"},
  { name: "Abel", role: "S"}
];

const nibLeadershipRaw: Omit<CouncilMember, 'councilType'>[] = NIB_DATA.leadership.map(l => ({ name: l.name, role: l.role }));

const allMembersMap = new Map<string, CouncilMember>();

function addMembersToMap(members: Omit<CouncilMember, 'councilType'>[], councilType: CouncilType) {
  members.forEach(member => {
    if (allMembersMap.has(member.name)) {
      const existing = allMembersMap.get(member.name)!;
      if (!existing.role.includes(member.role)) {
        existing.role = `${existing.role} / ${member.role}`;
      }
      if (!existing.details) existing.details = "";
      if (!existing.details.includes(councilType)){
         existing.details += ` Also in ${councilType}.`;
      }
    } else {
      allMembersMap.set(member.name, { ...member, councilType, details: `Primary: ${councilType}` });
    }
  });
}

addMembersToMap(supremeCouncilRaw, CouncilType.SUPREME);
addMembersToMap(secondaryCouncilRaw, CouncilType.SECONDARY);
addMembersToMap(governmentHierarchyRaw, CouncilType.HIERARCHY);
addMembersToMap(nibLeadershipRaw, CouncilType.NIB_LEADERSHIP);


export const COUNCIL_MEMBERS_ALL: CouncilMember[] = Array.from(allMembersMap.values()).sort((a,b) => a.name.localeCompare(b.name));


export const NATIONAL_SYMBOLS_DATA: ReferenceCategory = {
  title: "National Symbols (from Article V)",
  items: [
    { name: "Animal", description: "Lion" },
    { name: "Bird", description: "Peacock" },
    { name: "Sport", description: "Football" },
    { name: "Prisoners", description: "Agraj" },
    { name: "Government Type", description: "Democracy (imperfect)" },
    { name: "Song", description: "‘I’m Gonna Fly Some Planes’ by Rucka Rucka Ali" },
    { name: "Anthem", description: "Nazi Anthem by Adølf Hĩtler" },
    { name: "Flag", description: "The ReBirth (White: Peace, Black: Bravery, Red: Violence and Bloodshed)" }
  ]
};

export const PUNISHMENTS_DATA: ReferenceCategory = {
  title: "Punishments (from Article VI - Worst to Bad)",
  items: [
    { name: "1. Brazen Bull", description: "The punished shall be disciplined by the entire High Council and struck multiple times." },
    { name: "2. The Fadhil Treatment", description: "The individual shall be tortured by Fadhil." },
    { name: "3. The Cooked Chicken", description: "The punished loses all rights and will be repeatedly snitched upon." },
    { name: "4. The Elephant’s Tooth", description: "The punished will be verbally roasted against a wall without the right to respond, either verbally or physically." },
    { name: "5. The Darkhall Blade", description: "A piece of the individual’s hair shall be cut by the MoI." }
  ]
};

export const EMERGENCY_CODES_DATA: ReferenceCategory = {
  title: "Emergency Codes (from Article VII)",
  isList: true,
  listItems: [
    "Code Unicorn: Aarav is approaching",
    "Code Magnus: Teacher is nearby",
    "Code Extremus: Teacher for the specific periods is nearby",
    "Code Abort: SLT Member is nearby (Ms. Venetia, Ms. Fatima, etc.)",
    "Code Doom: We are being snitched on",
    "Code Vader: A government member is using power for their own good and is starting rebellion",
    "Code Frick: Someone has reminded teacher about completion work",
    "Code Skibidi: Shipping has occurred in Ferronova borders",
    "Code COD: A government member’s rights have been violated (entire country must fight the violator)",
    "Code Diddy: Someone’s being SUS",
    "Code Sundar: Hindi teacher is nearby"
  ],
  items: [] // Not used if listItems is present
};

export const ROLES_AND_TITLES_DATA: RoleTitle[] = [
  { abbr: "(MoI)", full: "Minister of Intelligence" },
  { abbr: "(MoS)", full: "Minister of Security" },
  { abbr: "(RoN)", full: "Representative of Nation" },
  { abbr: "(SS)", full: "Secretary Spy" },
  { abbr: "(Ro6B)", full: "Representative of 6B" },
  { abbr: "(S)", full: "Spy" },
  { abbr: "(LS)", full: "Lowly Spy" },
  { abbr: "(DoNIB)", full: "Director of National Intelligence Bureau" }
];

export const CONSTITUTION_CONCLUSION = "This concludes the Constitution of Ferronova. May it serve to guide the nation toward prosperity, justice, and peace for all its citizens.";

// --- High Council Authentication Quiz ---
export const HIGH_COUNCIL_PASSWORD = "F3RR0N_C0UNCIL"; // Updated Password

export const HIGH_COUNCIL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'hcq_great_separation',
    questionText: "What was the name of the time when there was a fight between the High Council members and Ferronova was split into two parts?",
    options: [
      "The Great Separation", // Correct Answer
      "The Grand Severance",
      "The Major Schism",
      "The Ultimate Division",
      "The Defining Split",
      "The Final Parting",
      "The Great Divide",
      "The Significant Rupture",
      "The Historic Breakup",
      "The Paramount Cleavage",
      "The Supreme Segregation",
      "The Grand Disunion",
      "The Notable Fragmentation",
      "The Profound Estrangement",
      "The Great Partition",
      "The Total Disconnection",
      "The Absolute Divergence",
      "The Great Disjunction",
      "The Critical Bifurcation",
      "The Solemn Secession",
      "The Imperial Split",
      "The Noble Divide",
      "The Sovereign Severance",
      "The Regal Rupture",
      "The Dynastic Division",
      "The Great Sundering",
      "The Factional Fracture",
      "The Council Conflict",
      "The Ferronova Rupture", // Updated option
      "The Two Realms Period"
    ],
    correctAnswer: "The Great Separation"
  }
];

// --- Confidential Intel Data ---
export const CONFIDENTIAL_INTEL_MESSAGES: ConfidentialMessage[] = [
  { 
    id: 'ci001', 
    title: "Directive Alpha-7: Project Chimera Update", 
    content: "All High Council members are to be briefed on the latest developments in Project Chimera. Phase 3 trials have yielded unexpected results. MoI Shahan will provide a full report during the emergency session on 2024-07-15. Utmost discretion is paramount. No discussion outside secure channels.",
    classification: 'TOP SECRET',
    date: '2024-07-10'
  },
  { 
    id: 'ci002', 
    title: "NIB Internal Memo: Potential Infiltration Vector", 
    content: "DoNIB has identified a potential vulnerability within the Secondary Council's communication network. Agent 'Nightingale' reports suspicious activity. All High Council members must ensure their personal comms devices are updated with the latest security patch (Titan-OS v3.4.1) by EOD.",
    classification: 'HIGH COUNCIL EYES ONLY',
    date: '2024-07-08'
  },
  {
    id: 'ci003',
    title: "The GOAT's Edict: Taxation Adjustments",
    content: "Amaan has decreed a temporary 50% reduction in luxury food item taxes for all citizens for one 'unit' to bolster morale. This is to be announced by RoN Hamdan. MoT Samrat is to ensure compliance and report any dissent.",
    classification: 'INTERNAL MEMO',
    date: '2024-07-05'
  }
];

// --- Polls Data ---
export const SAMPLE_POLLS: Poll[] = [
  {
    id: 'poll001',
    question: "Should Article II, Section 2 (Taxation) be amended to allow digital currency as a tax payment option?",
    options: [
      { id: 'p001o1', text: 'Yes, embrace technological advancement.', votes: 0 },
      { id: 'p001o2', text: 'No, traditional food tribute maintains cultural integrity.', votes: 0 },
      { id: 'p001o3', text: 'Further study by MoI and RoN required.', votes: 0 }
    ],
    isOpen: true,
    createdBy: 'Ehan (Advisor)',
    createdAt: new Date('2024-07-01T10:00:00Z'),
    isHighCouncilOnlyVote: true,
  },
  {
    id: 'poll002',
    question: "Approve 'Operation Sunstrike' - a covert NIB mission to gather intelligence on the 'Eastern Blockade'?",
    options: [
      { id: 'p002o1', text: 'Approve - Immediate Action Required.', votes: 0 },
      { id: 'p002o2', text: 'Deny - Risks outweigh potential gains.', votes: 0 },
      { id: 'p002o3', text: 'Approve with modifications (Provide details to MoI).', votes: 0 }
    ],
    isOpen: true,
    createdBy: 'Shahan (MoI)',
    createdAt: new Date('2024-07-05T14:30:00Z'),
    isHighCouncilOnlyVote: true,
  }
];
