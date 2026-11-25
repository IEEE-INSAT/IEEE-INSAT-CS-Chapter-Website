// All site copy lives here. Edit this file to update the site.

export const contact = {
  address: "676 INSAT Centre Urbain Nord BP, Tunis Cedex 1080",
  phone: "+216 27 208 167",
  email: "cs-insat@ieee.tn",
  maps: "https://www.google.com/maps/search/?api=1&query=INSAT+Centre+Urbain+Nord+Tunis",
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/INSAT.CS/" },
    { name: "Instagram", url: "https://www.instagram.com/ieee_cschapterinsatsb/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ieee-insat-sb-cs-chapter-984266190/" },
  ],
};

export const about = [
  "The IEEE INSAT Computer Society Chapter is the premier source of information, inspiration, and collaboration in INSAT’s computer science community. Connecting them to multiple resources and professionals in the field.",
  "The CS Chapter helps boost the skills of developers and future engineers by providing a variety of professional trainings, which allows them to test their skills through yearly competitions and teaches them teamwork by integrating them in the IEEE family.",
];

export const pillars = {
  mission:
    "We are here to show the world the beauty of computer science through the diverse efforts of our talented community. We are dedicated to improving technical skills by providing access to the latest trends through conferences, publications, and workshops with our country's most known researchers and industry leaders.",
  smart: ["Solve", "Motivate", "Aspire", "Renovate", "Think"],
  vision:
    "We strive to reinvent how people exchange knowledge, integrating information technology, computer science, and engineering. We want to share a sense of community, collaboration, and enthusiasm, and to provide a unique environment that makes exploring the world of computer science more exciting.",
};

export const facts = {
  intro:
    "IEEE Computer Society Chapter - INSAT Student Branch was founded by IEEEians with a passion for Software and Computer Science in March of 2015 and has since moved from strength to strength. Today we are home for:",
  stats: [
    { value: 300, label: "Members" },
    { value: 60, label: "Training Sessions" },
    { value: 5, label: "Events" },
    { value: 33, label: "Partners" },
  ],
};

// Flagship events, shown in the scroll-driven events hub (ported from the Time
// Portal's /events page, without its challenges). Each event keeps its own two
// brand colours: `accent` tints the title, tags and buttons; `accent2` the details.
// Gallery photos live in public/img/hub/<slug>-N.webp (npm run images:local).
export const hubEvents = [
  {
    slug: "ieeextreme", name: "IEEEXtreme", highlight: "Xtreme", mark: "XTREME",
    kicker: "Global programming competition",
    tagline: "24 hours, one problem set, and teams of IEEE student members around the world racing the clock.",
    about: "IEEEXtreme is IEEE’s global 24-hour programming competition. Teams of IEEE student members, supported by a proctor, solve a set of programming problems against the clock and against teams worldwide.",
    meta: ["24 hours", "Teams of up to 3", "Worldwide"],
    highlights: [
      { label: "Duration", value: "24 hours" },
      { label: "Team size", value: "Up to 3 students" },
      { label: "Open to", value: "IEEE student members" },
    ],
    link: { href: "https://ieeextreme.org", label: "Visit IEEEXtreme" },
    theme: { accent: "#2FB4FF", accent2: "#FF7A1A" },
    photos: 4,
  },
  {
    slug: "dataoverflow", name: "Data Overflow", highlight: "Overflow", mark: "DO",
    kicker: "IEEE CS INSAT × ACM INSAT",
    tagline: "Beyond the algorithm. Beyond the model. An AI and data science event where data is the new water.",
    about: "Data Overflow is the AI and data science event organized jointly by IEEE CS INSAT and ACM INSAT. It combines beginner and intermediate workshop tracks, an AI day with research papers, expert panels and tech talks, and DataQuest, a hackathon built around a single real-world dataset.",
    meta: ["AI & data science", "Jan–Feb 2026", "INSAT, Tunis"],
    highlights: [
      { label: "Organizers", value: "IEEE CS INSAT × ACM INSAT" },
      { label: "Hackathon", value: "DataQuest · 10 hours" },
      { label: "Venue", value: "INSAT, Tunis" },
    ],
    link: { href: "https://data-overflow.tn", label: "Visit Data Overflow" },
    theme: { accent: "#00F0FF", accent2: "#2563FF" },
    photos: 4,
  },
  {
    slug: "bioit", name: "BioIT", highlight: "IT", mark: "BIO",
    kicker: "IEEE CS INSAT × IEEE EMBS INSAT",
    tagline: "Where life sciences and code meet to solve real problems.",
    about: "BioIT is organized jointly by IEEE CS INSAT and IEEE EMBS INSAT, at the crossroads of biology, medicine and information technology. Details of the next edition will be announced soon.",
    meta: ["Biology × IT", "IEEE CS × EMBS"],
    highlights: [
      { label: "Organizers", value: "IEEE CS INSAT × IEEE EMBS INSAT" },
      { label: "Format", value: "To be announced" },
      { label: "Next edition", value: "To be announced" },
    ],
    theme: { accent: "#3DF5A0", accent2: "#C7F45B" },
    photos: 0,
  },
  {
    slug: "ains", name: "AINS", highlight: "AI", mark: "AINS",
    kicker: "AI National Summit",
    tagline: "Learn. Connect. Build the future. Three days of talks, workshops and competitions in AI.",
    about: "AINS, the Artificial Intelligence National Summit, brings 500+ students, developers and tech enthusiasts from across Tunisia together for three days of keynotes, hands-on workshops, a job fair, Data Science and MLOps competitions, a poster session and a hackathon.",
    meta: ["4th edition", "25–27 June", "Hammamet"],
    highlights: [
      { label: "Edition", value: "AINS 4.0" },
      { label: "Prize pool", value: "15,000 DT" },
      { label: "Venue", value: "Hammamet Garden Resort & Spa" },
    ],
    link: { href: "https://www.ai-national-summit.tech", label: "Visit AINS" },
    theme: { accent: "#D946EF", accent2: "#8C1EFF" },
    photos: 4,
  },
];

// Other events from the old site's timeline (images in public/img/events).
export const archiveEvents = [
  { img: "summer-school-2026", title: "Summer School 9.0", text: "The IEEE INSAT Student Branch’s weekend of hands-on workshops, run by all its chapters. The 2026 edition (26–27 September) covered AI, IoT, bioinformatics, UAVs, satellites, energy, 3D printing and more. Our chapter led AI Engineering 101 with Kmar Ben Ayed and Introduction to IT with Emna Drihem." },
  { img: "orbit", title: "Orbit", text: "The first DevOps competition in Tunisia: a month of DevOps, MLOps and Cloud workshops ending in a 12-hour hackathon at INSAT." },
  { img: "hoc", title: "Hour of Code", text: "Every year we take the global Hour of Code movement into primary schools across Tunisia and teach pupils the basics of programming." },
  { img: "cstc", title: "CSTC — IEEE Grand Tech", text: "An international event on the newest technologies, with workshops, conferences and soft-skills training led by national and international experts." },
  { img: "trainings", title: "Trainings", text: "Hard-skills and soft-skills trainings all year round, chosen from what students tell us they need most." },
];

// photos = number of images in public/img/activities/<slug>-N.webp
export const activities = [
  // 2026 and late 2025: from the chapter's Facebook page
  { slug: "xtreme20", photos: 3, year: 2026, date: "31 Oct 2026", title: "IEEEXtreme 20.0", text: "Our INSAT edition of IEEE’s global 24-hour programming competition, themed as a journey beyond the known. Teams coded through the night, supported by our partners DELL Technologies, Everience Tunisia, Yab, MAD Chips and Hkeyet events, and by ACM INSAT, with whom we ran the preparation workshops." },
  { slug: "cparena", photos: 3, year: 2026, date: "Oct 2026", title: "CP Arena", text: "A beginner-friendly training ground before IEEEXtreme: teams explored competitive programming, sharpened their logic and lived the thrill of a real contest before the main event." },
  { slug: "cpstrat", photos: 1, year: 2026, date: "14 Oct 2026", title: "CP Strategies & Time Complexity (with ACM INSAT)", text: "The second competitive programming workshop with ACM INSAT, led by Wassim Fkih and Mohamed Nadhir Djebbi: deeper problem-solving strategies and time complexity analysis." },
  { slug: "cpp", photos: 1, year: 2026, date: "7 Oct 2026", title: "C++ Fundamentals & Time Complexity (with ACM INSAT)", text: "A hands-on workshop with ACM INSAT, led by Wassim Fkih and Mohamed Nadhir Djebbi, on writing C++ that is not just correct but fast, and on reasoning about time complexity." },
  { slug: "cpeveryone", photos: 1, year: 2026, date: "30 Sep 2026", title: "Training Protocol 01: CP for Everyone", text: "Our first IEEEXtreme 20.0 preparation workshop at INSAT (Amphi A4), led by Med Aziz Tabakh and Med Yassine Rached, to build the problem-solving basics every competitive programmer needs." },
  { slug: "introit26", photos: 3, year: 2026, date: "27 Sep 2026", title: "Summer School 9.0: Introduction to IT", text: "Our second Summer School workshop, led by Emna Drihem: a tour of the vast world of IT, its applications and its domains." },
  { slug: "ai101", photos: 3, year: 2026, date: "26 Sep 2026", title: "Summer School 9.0: AI Engineering 101", text: "Our first Summer School workshop, led by Kmar Ben Ayed: the foundations of AI engineering, with every participant completing a project of their own." },
  { slug: "ga26", photos: 3, year: 2026, date: "Sep 2026", title: "General Assembly 2026", text: "Our first general assembly of the 2026–2027 mandate, where new and returning members discovered the chapter, its departments and the events planned for the year." },
  { slug: "aesh", photos: 1, year: 2026, date: "Jul 2026", title: "AESH Hackathon finals in Cairo", text: "Team Les Talelas — Akrem Medimagh, Rayen Khammar, Laarif Talel, Iyed Mdimegh and Adam Bhouri — qualified among the top 10 of 113 international teams and represented IEEE CS INSAT and Tunisia at the AESH international aerospace sustainability hackathon finals in Cairo, Egypt." },
  { slug: "design", photos: 3, year: 2026, date: "Apr 2026", title: "Design Theory Workshop", text: "A workshop led by Rayen Khammar, sharing practical insights and real design-thinking approaches." },
  { slug: "crescent", photos: 1, year: 2026, date: "13 Mar 2026", title: "The Crescent Series: Ask Your Teacher!", text: "The first session of the Crescent Series: a coffee talk on the IT world with Mr. Aymen Sellaouti and Mme. Lilia Sfaxi, both teachers at INSAT, from university life to professional careers, at Café La Terasse, Menzah 5." },
  { slug: "tsyp13", photos: 3, year: 2025, date: "Dec 2025", title: "2nd place at the TSYP13 CS Technical Challenge", text: "Our team — Mohamed Yassine Kallel, Yasser Chouket, Moetez Fradi and Makki Alloulou — took 2nd place at the TSYP13 Computer Society Technical Challenge, organized by IEEE ENIS SB and the IEEE Tunisia Section." },
  { slug: "scrum", photos: 1, year: 2025, date: "Dec 2025", title: "Introduction to Scrum", text: "The Projects Department’s first workshop, led by Mohamed Yassine Kallel, vice chair technical activities: a simple way to plan work and review progress, open to project heads and team members alike." },
  { slug: "cstam2", photos: 3, year: 2025, date: "22–23 Nov 2025", title: "CSTAM 2.0 in Sousse", text: "Our members represented INSAT at the IEEE Computer Society Tunisian Annual Meeting, took part in its activities and networked with the other CS student branch chapters." },
  { slug: "wevioo", photos: 3, year: 2025, date: "19 Nov 2025", title: "Industrial visit: Wevioo HQ", text: "Members toured the headquarters of Wevioo, an international digital consulting and services company, discovered its activities and met its teams. Thanks to Wevioo for the invitation." },
  { slug: "xtreme19", photos: 3, year: 2025, date: "Oct 2025", title: "IEEEXtreme 19.0", text: "A full night of competitive programming at INSAT. The top three INSAT teams — Sinkilopizon, Cham3a and Kabbout — were rewarded with Spacenet vouchers, with support from Talan, Thunders, Spacenet, Yab, MAD and Campi." },
  { slug: "data-structures", photos: 3, year: 2025, date: "8 Oct 2025", title: "Data Structures", text: "This session covered the fundamental concepts of data structures, including arrays, linked lists, stacks, queues, trees and graphs. It emphasized their design, implementation and practical applications in efficient data storage and manipulation, forming a foundation for algorithm development and software engineering." },
  { slug: "intro-cp", photos: 0, year: 2025, date: "1 Oct 2025", title: "Introduction to Competitive Programming", text: "This session introduced the fundamentals of competitive programming, focusing on problem-solving techniques and algorithms. It emphasized efficient coding, logical reasoning and optimization strategies to solve algorithmic challenges under time constraints." },
  { slug: "ai-se", photos: 2, year: 2025, date: "28 Sep 2025", title: "AI for Software Engineering", text: "This session explored the applications of Artificial Intelligence (AI) in software engineering, including code generation, bug detection and software testing automation. It highlighted how AI techniques can enhance productivity, improve code quality and support decision-making throughout the software development lifecycle." },
  { slug: "intro-it", photos: 2, year: 2025, date: "28 Sep 2025", title: "Introduction to IT", text: "This session provided an overview of Information Technology (IT) fundamentals, including computer hardware and software, networks and basic IT services. It introduced core concepts such as data management, cybersecurity and system administration, offering a foundational understanding of IT principles and their applications in modern organizations." },
  { slug: "intro-nlp", photos: 0, year: 2025, date: "12 Apr 2025", title: "Introduction to Natural Language Processing", text: "This session introduced the fundamentals of Natural Language Processing (NLP), focusing on how computers analyze, understand, and generate human language. It covered key concepts such as text preprocessing, tokenization, and basic NLP tasks including text classification and sentiment analysis. The session provided a foundational understanding of NLP techniques and their applications." },
  { slug: "transformer", photos: 0, year: 2025, date: "8 Apr 2025", title: "Introduction to the Transformer Architecture", text: "In this session, we broke down the core concepts behind the Transformer architecture — the foundation of today's leading LLMs like Claude, GPT and BERT. We explored the basics of sequence models and how Transformers revolutionized them using attention and self-attention, enabling the capture of complex patterns in text without recurrence. Now the go-to architecture in NLP, Transformers have transformed how machines understand language." },
  { slug: "dataquest", photos: 3, year: 2025, date: "22–23 Feb 2025", title: "DataQuest – Data Science Competition", text: "DataQuest was a 24-hour data science competition focused on solving real-world problems using data analysis and machine learning techniques. Participants worked under time constraints to explore datasets, build predictive models and present data-driven insights. The event encouraged teamwork, problem-solving and practical application of data science skills." },
  { slug: "nvidia", photos: 3, year: 2025, date: "16 Feb 2025", title: "NVIDIA Workshop – Computer Vision for Industrial Inspection (Certified)", text: "This certified workshop focused on the application of computer vision techniques for industrial inspection. It covered the use of deep learning models to detect defects, perform visual quality control and automate inspection processes. The workshop emphasized practical use cases and NVIDIA tools, providing hands-on insights into deploying computer vision solutions in industrial environments." },
  { slug: "intro-cv", photos: 3, year: 2025, date: "5 Feb 2025", title: "Introduction to Computer Vision", text: "This session provided an overview of the fundamental concepts of Computer Vision, focusing on how machines interpret and analyze visual data. It introduced key topics such as image representation, feature extraction and basic vision tasks including image classification and object detection. The session laid the groundwork for understanding computer vision techniques and their applications." },
  { slug: "intro-ml", photos: 3, year: 2025, date: "29 Jan 2025", title: "Introduction to Machine Learning", text: "This session introduced the fundamental concepts of Machine Learning, highlighting its role within artificial intelligence and its main applications. It covered the basic learning paradigms (supervised, unsupervised and reinforcement learning), as well as key notions related to data, models and performance evaluation. The session provided a solid foundation for understanding how machine learning systems operate." },
  { slug: "advancing-ai", photos: 1, year: 2021, date: "24 Nov 2021", title: "Advancing Through AI", text: "During the IEEE Region8 Cross-Sectional Student Initiatives Booster Program hosted by our IEEE INSAT student branch, our chapter held the \"Advancing IoT through AI\" workshop where Mouafek Ayedi explained some concepts about IoT, AI, and how the two can be connected." },
  { slug: "webdev-2", photos: 3, year: 2021, date: "17 Nov 2021", title: "WebDev Workshop WEEK 2", text: "In the second session of our web development series our topic was CSS, our webmaster along with a whole team assured this workshop and helped all participants. The main points were: what is CSS, how does it work and the concept of classes and ids. The trainers explained also CSS selectors and properties. Finally, they tested the participants' comprehension of the concepts by a Kahoot quiz where the fun, competition and learning were all mixed together." },
  { slug: "webdev-1", photos: 3, year: 2021, date: "13 Nov 2021", title: "WebDev Workshop WEEK 1", text: "We held our first series of workshops for web development where we introduced some basic concepts for front-end and back-end development and where we had Oussema Ghorbel tutoring our participants about some computer networks fundamentals. We ended our sessions with an introduction to Git and HTML and left the participants with homework for next session. We also made sure they met each other and bonded over the break between sessions." },
  { slug: "xtreme-15", photos: 3, year: 2021, date: "22–23 Oct 2021", title: "IEEEXtreme 15", text: "IEEEXtreme 15.0 INSAT edition took place in INSAT with our theme being the Olympics. Our opening ceremony started with a word from the committee and was enclosed by a performance from a local band. Afterwards, the participants went to the competition space, had dinner and the 24h contest began. All along the journey they played games, ate a lot, watched a movie and slept too. In the feedback form, we found highly satisfied participants and that was our goal." },
  { slug: "ss-cp", photos: 3, year: 2021, date: "11–12 Sep 2021", title: "Summer School CP", text: "During this workshop, the trainer talked about the history of competitive programming, the interest in such competitions. Then he introduced the notion of applications' complexity and the rest of the workshop was dedicated to solving problems." },
  { slug: "ss-flutter", photos: 3, year: 2021, date: "10–11 Sep 2021", title: "Summer School Flutter", text: "During this workshop, the trainers introduced some fundamental concepts needed for Flutter then they taught the participants to develop some app pages, connect them, style the buttons and the text to end with making the logic which collects the answers either wrong or right ones." },
];

export const team = [
  { img: "marwen", name: "Marwen Agrebi", role: "Chair" },
  { img: "kmar", name: "Kmar Ben Ayed", role: "Vice Chair Technical Activities" },
  { img: "achref", name: "Achref Antar", role: "Vice Chair Membership Activities" },
  { img: "ghayth", name: "Ghayth Abidli", role: "Treasurer" },
  { img: "roudaina", name: "Roudaina Linoubli", role: "General Secretary" },
  { img: "ines", name: "Ines Fakhfakh", role: "Media Manager" },
];

// dark: true = white logo, shown on an ink tile
// Partners who supported our events. dark: true = white logo, shown on an ink tile.
// Logos from the chapter's "Ceux qui nous ont fait confiance" board (public/img/sponsors).
export const sponsors = [
  { img: "kia", name: "Kia" },
  { img: "banque-zitouna", name: "Banque Zitouna" },
  { img: "s4", name: "Thunders" },
  { img: "hutchinson", name: "Hutchinson" },
  { img: "cooperation-allemande", name: "German–Tunisian Cooperation" },
  { img: "sopal", name: "SOPAL" },
  { img: "vectors", name: "Vectors" },
  { img: "integration-objects", name: "Integration Objects" },
  { img: "bako", name: "BAKO" },
  { img: "invest-jobs", name: "Invest Jobs" },
  { img: "telnet", name: "Telnet" },
  { img: "institut-francais", name: "Institut français de Tunisie" },
  { img: "partner-b", name: "Partner" },
  { img: "amen-bank", name: "Amen Bank" },
  { img: "ubci", name: "UBCI" },
  { img: "instadeep", name: "InstaDeep" },
  { img: "innovi", name: "Innov'i" },
  { img: "mitsubishi-electric", name: "Mitsubishi Electric" },
  { img: "asteelflash", name: "Asteelflash" },
  { img: "talan", name: "Talan" },
  { img: "gat-assurances", name: "GAT Assurances" },
  { img: "stb", name: "STB Bank" },
  { img: "yellowsys", name: "Yellowsys" },
  { img: "sofrecom", name: "Sofrecom" },
  { img: "draexlmaier", name: "Dräxlmaier" },
  { img: "orange", name: "Orange" },
  { img: "tunur", name: "Tunur" },
  { img: "csf", name: "CSF Groupe" },
  { img: "s6", name: "GlobalNet" },
  { img: "s9", name: "Novo Nordisk" },
  { img: "mad", name: "MAD" },
  { img: "s2", name: "Yab" },
  { img: "s1", name: "Campi" },
];

// The Time Portal: our own platform. Shown on the home page as a presentation, no link.
export const portal = {
  name: "The Time Portal",
  tagline: "Our own platform, built and maintained by the chapter.",
  intro: "The Time Portal is the CS INSAT platform: one place to take part in our challenges, follow our events and learn at your own pace. It is designed, coded and run by the chapter's own members.",
  features: [
    { t: "A catalogue of challenges", d: "Grouped by category and difficulty, with a new one every month. Competitive programming is only one of the categories, and programming challenges are judged automatically." },
    { t: "Events hub", d: "Every flagship event in one place, with its details, dates and highlights." },
    { t: "Points, ranks and a leaderboard", d: "Approved solutions earn points, and your dashboard tracks your rank and progress." },
    { t: "Workshops and learning paths", d: "The workshops we run and guided roadmaps, to help you start and keep growing." },
  ],};
