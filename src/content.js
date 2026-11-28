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
  "The IEEE INSAT Computer Society Chapter is where INSAT's community comes to learn, build and grow. We connect curious students with the people, tools and opportunities that turn an interest in technology into a lasting career.",
  "Through hands-on trainings, ambitious competitions and real teamwork within the IEEE family, we help future engineers sharpen their skills, test their limits and discover what they're capable of. Here you don't just discover computer society: you practise it, side by side with people who share your drive.",
];

export const pillars = {
  mission:
    "Our mission is to show the world how powerful and igniting computer science can be through the work of a talented, driven community. We open the door to the latest technologies with workshops, conferences and competitions led by researchers and industry experts, so every member leaves more skilled, more confident and ready to make an impact.",
  vision:
    "We dream of a place where students don't wait for graduation to meet the real world. A place where computer science comes to life in health, energy, finance, industry and beyond. Our vision is to create that environment of applied computer science, sharing it across every domain, and opening doors for our members to connect, collaborate, and grow with real companies working on real challenges and projects. Because the true power of computer science isn't what it is, but everything it touches.",
};

// "The game plan" (section 03): a character builder. Each item stands for something the
// chapter gives its members; `from` says which activity earns it. `slot` must be one of
// head, hands, chest, feet, back; `door` marks the cursed item that can only be thrown out.
export const game = {
  title: "Build your character.",
  classes: ["Newcomer", "Apprentice", "Explorer", "Builder", "Challenger", "Future engineer"],
  items: [
    { id: "curiosity", slot: "head", name: "Helm of Curiosity", word: "Curiosity", color: "lime", flavor: "Asks why. Then asks how.", from: "your first workshop" },
    { id: "craft", slot: "hands", name: "Builder's Gloves", word: "Craft", color: "sky", flavor: "+10 to shipping real things.", from: "hands-on trainings" },
    { id: "teamwork", slot: "chest", name: "Co-op Armor", word: "Teamwork", color: "orange", flavor: "Damage shared is damage halved.", from: "team projects" },
    { id: "grit", slot: "feet", name: "24h Boots", word: "Grit", color: "violet", flavor: "Stamina for one very long night.", from: "IEEEXtreme" },
    { id: "network", slot: "back", name: "Network Cape", word: "Connections", color: "cream", flavor: "You fly further with others.", from: "industry visits" },
    { id: "fear", slot: "door", name: "Fear of Failing", word: "Cursed", color: "grey", flavor: "Heavy and useless.", from: "everyone starts with one" },
  ],
  done: "Character complete. Ready for the real world. Join the chapter to play for real.",
};

export const facts = {
  intro:
    "Founded in March 2015 by IEEE members with a passion for software and computer science, the IEEE Computer Society Chapter of the INSAT Student Branch has grown stronger every year. Today, we are proud to be home to:",
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
    about: "More than a programming competition, IEEEXtreme is a 24-hour journey of problem-solving, perseverance, and teamwork. Bringing together teams of up to three IEEE INSAT student members, this global challenge pushes participants to think critically, adapt quickly, and turn complex problems into working solutions under pressure. Guided by a proctor, our members take on the challenge together, experiencing a night where determination, collaboration, and the passion for coding take center stage.",
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
    about: "In collaboration with ACM INSAT, Data Overflow brings the worlds of Artificial Intelligence and Data Science closer to students through a journey from fundamentals to real-world innovation. Through dedicated beginner and intermediate workshop tracks, participants build their technical foundations before diving into an AI-focused day featuring research papers, expert panels, and technology talks. The experience culminates in DataQuest, a hackathon where teams explore a real-world dataset, transform raw information into meaningful insights, and turn their ideas into practical solutions.",
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
    about: "Organized in collaboration with IEEE EMBS INSAT, BioIT explores the powerful intersection of biology, medicine, and information technology. It brings together curious minds from different disciplines to discover how computational thinking and technological innovation can contribute to understanding life and addressing challenges in healthcare. BioIT is an invitation to explore a field where technology goes beyond code and becomes a tool for meaningful scientific and human impact. The next edition is on its way.",
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
    about: "AINS brings together more than 500 students, developers, researchers, and technology enthusiasts from across Tunisia for three days dedicated to exploring and shaping the future of Artificial Intelligence. Through inspiring keynotes, hands-on workshops, a job fair, competitions, a poster session, and a hackathon, participants move beyond discovering emerging technologies to actively experimenting with them. AINS creates a space where knowledge is exchanged, connections are built, and promising ideas have the opportunity to become tangible projects.",
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
  { img: "summer-school-2026", title: "Summer School 9.0", text: "A weekend dedicated to exploration, discovery, and hands-on learning, Summer School 9.0 brought together the chapters of IEEE INSAT Student Branch to introduce participants to some of the most exciting fields in technology. Held on September 26–27, 2026, the program explored Artificial Intelligence, IoT, bioinformatics, UAVs, satellites, energy, 3D printing, and more. Our Computer Society Chapter contributed two workshops: AI Engineering 101, led by Kmar Ben Ayed, and Introduction to IT, led by Emna Drihem, giving participants the opportunity to discover new domains and take their first steps toward building practical skills." },
  { img: "orbit", title: "Orbit", text: "Orbit brought the challenge of DevOps to INSAT through Tunisia's first DevOps competition. Designed as a journey of progressive learning, the event combined a month of workshops covering DevOps, MLOps, and Cloud technologies with an intensive 12-hour hackathon. Participants moved from discovering essential concepts to applying them under real competitive conditions, putting their newly acquired skills to the test through collaboration, experimentation, and problem-solving." },
  { img: "hoc", title: "Hour of Code", text: "Every year, we take the spirit of the global Hour of Code initiative beyond university walls and into primary schools across Tunisia. Through accessible and engaging programming activities, we introduce young pupils to the logic, creativity, and possibilities behind computer science. More than a first coding experience, these sessions aim to spark curiosity, build confidence, and show the next generation that technology is something they can create, not simply consume." },
  { img: "cstc", title: "CSTC — IEEE Grand Tech", text: "CSTC - IEEE Grand Tech creates a meeting point for technology enthusiasts, professionals, and students to explore emerging technologies and exchange expertise. Through conferences, technical workshops, and soft-skills training led by national and international experts, participants gain exposure to new perspectives while strengthening both their technical knowledge and professional capabilities. The event encourages continuous learning and helps bridge the gap between academic discovery and the evolving technology industry." },
  { img: "trainings", title: "Trainings", text: "Learning does not stop after an event. Throughout the year, our chapter organizes technical and soft-skills training sessions designed around the evolving needs of our members. From strengthening programming and engineering foundations to developing communication, teamwork, and leadership abilities, these sessions create continuous opportunities for growth. By listening to our community and responding to its needs, we aim to equip members with skills they can carry into their projects, careers, and future initiatives." },
];

// photos = number of images in public/img/activities/<slug>-N.webp
export const activities = [
  // 2026 and late 2025: from the chapter's Facebook page
  { slug: "cstam3", photos: 5, year: 2026, date: "14–15 Nov 2026", title: "CSTAM 3.0 in Hammamet", text: "CSTAM 3.0, the IEEE Computer Society Tunisian Annual Meeting organized by the IEEE CS ENET'Com Student Branch Chapter, brought 600+ students, researchers and industry leaders to the Méhari Hotel in Hammamet for two days of keynotes, hands-on workshops, competitions and networking. Our members came home with a strong set of results: 1st place in the Ninety eGaming challenge, 2nd and 3rd place in CS Arena, a multidisciplinary competition spanning IoT, agentic AI, cloud, data science, cybersecurity and competitive programming, and the Market Pioneer award in the Project Holder track for our Smart Mirror. Our teams also pitched among the top 3 in the HealthTech and Cloud & Infrastructure tracks of the CSTAM Book challenges." },
  { slug: "xtreme20", photos: 3, year: 2026, date: "31 Oct 2026", title: "IEEEXtreme 20.0", text: "Under the theme of a journey beyond the known, IEEEXtreme 20.0 brought INSAT participants together for an unforgettable 24-hour programming challenge. Teams pushed their problem-solving abilities to the limit, tackling algorithmic challenges throughout the night while relying on teamwork, persistence, and strategic thinking. Behind the competition was a collective effort involving our partners DELL Technologies, Everience Tunisia, Yab, MAD Chips, and Hkeyet Events, alongside ACM INSAT, with whom we organized the training workshops. Together, we created an environment where participants could challenge themselves, learn from one another, and experience the spirit of competitive programming on a global stage." },
  { slug: "cparena", photos: 3, year: 2026, date: "Oct 2026", title: "CP Arena", text: "Before taking on the 24-hour IEEEXtreme challenge, participants had the opportunity to step into the world of Competitive Programming through CP Arena. Designed as an accessible starting point, the session introduced teams to the logic and problem-solving mindset behind programming contests. Through practical challenges and hands-on exploration, participants strengthened their reasoning, discovered how to approach unfamiliar problems, and experienced the excitement of solving problems against the clock. It was the first step toward a bigger challenge." },
  { slug: "cpstrat", photos: 1, year: 2026, date: "14 Oct 2026", title: "CP Strategies & Time Complexity (with ACM INSAT)", text: "Building on the foundations of competitive programming, this second workshop organized with ACM INSAT took participants deeper into the art of designing efficient solutions. Led by Wassim Fkih and Mohamed Nadhir Djebbi, the session explored problem-solving strategies and time complexity analysis, helping participants understand not only how to solve a problem, but how to evaluate and optimize their approach. It encouraged a shift from simply finding an answer to finding a solution that is efficient, scalable, and competitive." },
  { slug: "cpp", photos: 1, year: 2026, date: "7 Oct 2026", title: "C++ Fundamentals & Time Complexity (with ACM INSAT)", text: "A correct solution is only the beginning; writing efficient code is what makes it stronger. Led by Wassim Fkih and Mohamed Nadhir Djebbi, this hands-on workshop, organized with ACM INSAT, focused on strengthening participants' C++ foundations while introducing the principles of algorithmic efficiency. Through practical explanations and problem-solving exercises, participants explored how to write cleaner code, understand computational complexity, and make better implementation choices when facing programming challenges." },
  { slug: "cpeveryone", photos: 1, year: 2026, date: "30 Sep 2026", title: "Training Protocol 01: CP for Everyone", text: "Every strong competitive programmer starts with the fundamentals. As the first preparation workshop for IEEEXtreme 20.0 at INSAT, this session opened the door to Competitive Programming for aspiring problem-solvers. Led by Med Aziz Tabakh and Med Yassine Rached, the workshop introduced essential problem-solving foundations and encouraged participants to approach algorithmic challenges with structure, logic, and confidence. It marked the beginning of a preparation journey built on learning, practice, and continuous improvement." },
  { slug: "introit26", photos: 3, year: 2026, date: "27 Sep 2026", title: "Summer School 9.0: Introduction to IT", text: "Technology is much bigger than a single programming language or field. Led by Emna Drihem, this workshop introduced participants to the broad landscape of Information Technology, exploring its different domains and the opportunities each one offers. Through a guided overview of the IT ecosystem, participants gained a clearer understanding of how its different disciplines connect and discovered possible paths for their own learning and professional journeys." },
  { slug: "ai101", photos: 3, year: 2026, date: "26 Sep 2026", title: "Summer School 9.0: AI Engineering 101", text: "From understanding Artificial Intelligence to building something with it, this workshop gave participants a practical introduction to AI Engineering. Led by Kmar Ben Ayed, the session explored the foundations of AI engineering and guided participants through the process of applying what they learned. Rather than leaving with theory alone, every participant completed the workshop with a project of their own: a tangible first step from curiosity to creation." },
  { slug: "ga26", photos: 3, year: 2026, date: "Sep 2026", title: "General Assembly 2026", text: "Every new chapter begins with the people who believe in what it can become. Our 2026-2027 General Assembly brought together new and returning members to introduce the chapter, explore its departments, and discover the opportunities ahead. More than an introduction to our upcoming events, it marked the beginning of a new mandate built around shared ambitions, collaboration, and the motivation to create meaningful experiences throughout the year." },
  { slug: "aesh", photos: 1, year: 2026, date: "Jul 2026", title: "AESH Hackathon finals in Cairo", text: "From an international competition of 113 teams to a place among the top 10, Team Les Talelas made an achievement worth celebrating. Composed of Akrem Medimagh, Rayen Khammar, Laarif Talel, Iyed Mdimegh, and Adam Bhouri, the team represented IEEE CS INSAT and Tunisia at the AESH International Aerospace Sustainability Hackathon Finals in Cairo, Egypt. Their achievement reflects the dedication, creativity, and collaborative spirit of students ready to take on international challenges and bring their ideas to a wider stage." },
  { slug: "design", photos: 3, year: 2026, date: "Apr 2026", title: "Design Theory Workshop", text: "Great design starts with the ability to understand problems differently. Led by Rayen Khammar, this workshop introduced members to practical design theory and real-world design-thinking approaches. Through shared insights and applicable methodologies, participants explored how to approach challenges from the perspective of users, rethink assumptions, and turn ideas into more thoughtful solutions. The session encouraged members to bring design thinking into their projects and everyday problem-solving." },
  { slug: "crescent", photos: 1, year: 2026, date: "13 Mar 2026", title: "The Crescent Series: Ask Your Teacher!", text: "Some of the most valuable conversations happen outside the classroom. The first session of The Crescent Series brought students and teachers together for an informal coffee talk with Mr. Aymen Sellaouti and Mme. Lilia Sfaxi, both teachers at INSAT. Hosted at Café La Terrasse, Menzah 5, the discussion opened up conversations about university life, the IT world, professional development, and the experiences that shape a career. By creating a relaxed space for questions, advice, and personal perspectives, the session strengthened the connection between students and the people guiding their academic journeys." },
  { slug: "tsyp13", photos: 3, year: 2025, date: "Dec 2025", title: "2nd place at the TSYP13 CS Technical Challenge", text: "Hard work, technical preparation, and teamwork came together in an outstanding result at the TSYP13 Computer Society Technical Challenge. Our team, composed of Mohamed Yassine Kallel, Yasser Chouket, Moetaz Fradi, and Makki Aloulou, secured second place in the competition organized by IEEE ENIS SB and the IEEE Tunisia Section. Their achievement is a testament to the effort invested in tackling technical challenges and the value of collaboration in turning knowledge into results." },
  { slug: "scrum", photos: 1, year: 2025, date: "Dec 2025", title: "Introduction to Scrum", text: "Strong projects need more than good ideas, they need teams that know how to bring those ideas to life. Organized by the Projects Department and led by Mohamed Yassine Kallel, Vice Chair of Technical Activities, this workshop introduced participants to Scrum and its practical role in managing collaborative projects. Open to both project heads and team members, the session explored how to organize tasks, distribute responsibilities, track progress, and maintain a structured workflow. Participants gained practical tools to make teamwork more organized, transparent, and effective." },
  { slug: "cstam2", photos: 3, year: 2025, date: "22–23 Nov 2025", title: "CSTAM 2.0 in Sousse", text: "CSTAM 2.0 brought our members to Sousse for the IEEE Computer Society Tunisian Annual Meeting, creating an opportunity to connect with the wider national Computer Society community. Through participation in the event's activities, our representatives exchanged experiences, discovered initiatives from other student branch chapters, and built connections with fellow members from across Tunisia. Beyond attending a national gathering, it was an opportunity to strengthen our community and bring new perspectives back to INSAT." },
  { slug: "wevioo", photos: 3, year: 2025, date: "19 Nov 2025", title: "Industrial visit: Wevioo HQ", text: "Taking learning beyond university walls, our members visited the headquarters of Wevioo, an international digital consulting and services company. The visit offered an opportunity to discover the professional environment firsthand, explore the company's work, and meet the teams behind its projects. By connecting academic learning with industry experience, the visit helped participants gain a closer understanding of professional practices and the realities of working in the digital sector. We extend our sincere thanks to Wevioo for welcoming our members and making this experience possible." },
  { slug: "xtreme19", photos: 3, year: 2025, date: "Oct 2025", title: "IEEEXtreme 19.0", text: "One night, countless challenges, and teams determined to push their limits. IEEEXtreme 19.0 brought INSAT's competitive programming community together for a full 24-hour programming experience, where participants tested their logic, endurance, and ability to work under pressure. The effort and dedication of our participants were celebrated through awards for the three highest-ranked INSAT teams: Sinkilopizon, Cham3a, and Kabbout, who received Spacenet vouchers thanks to the support of Talan, Thunders, Spacenet, Yab, MAD, and Campi. More than a competition, the event celebrated the spirit of learning, perseverance, and friendly rivalry that makes IEEEXtreme special." },
  { slug: "data-structures", photos: 3, year: 2025, date: "8 Oct 2025", title: "Data Structures", text: "Behind every efficient algorithm lies a solid understanding of how data is organized. This session explored the essential data structures that form the backbone of computer science: arrays, linked lists, stacks, queues, trees, and graphs. Participants discovered how these structures work, how they are implemented, and how choosing the right one can significantly affect the efficiency of a solution. By strengthening these fundamental concepts, the session equipped participants with the knowledge needed to approach more complex algorithms and software engineering challenges." },
  { slug: "intro-cp", photos: 0, year: 2025, date: "1 Oct 2025", title: "Introduction to Competitive Programming", text: "Competitive programming is more than writing code quickly; it is about learning how to think, reason, and solve problems efficiently. This introductory session familiarized participants with the world of programming contests through essential problem-solving techniques, fundamental algorithms, and efficient coding practices. By exploring how to break down challenges, identify suitable approaches, and reason under time constraints, participants developed a foundation for tackling increasingly complex problems and pursuing competitive programming further." },
  { slug: "ai-se", photos: 2, year: 2025, date: "28 Sep 2025", title: "AI for Software Engineering", text: "Artificial Intelligence is reshaping the way software is designed, developed, tested, and maintained. This session explored how AI-powered tools can support software engineers throughout the development lifecycle, from code generation and bug detection to automated testing and decision-making. Participants discovered practical applications of AI in everyday engineering workflows and examined how these technologies can improve productivity, support code quality, and change the way development teams approach their work." },
  { slug: "intro-it", photos: 2, year: 2025, date: "28 Sep 2025", title: "Introduction to IT", text: "Understanding the technology that powers our world starts with understanding the foundations of Information Technology. This session offered participants a structured introduction to hardware, software, computer networks, and core IT services, while exploring essential areas such as data management, cybersecurity, and system administration. By connecting these concepts into a broader picture, the session helped participants understand how modern technological infrastructures operate and how different IT disciplines contribute to today's digital organizations." },
  { slug: "intro-nlp", photos: 0, year: 2025, date: "12 Apr 2025", title: "Introduction to Natural Language Processing", text: "How can machines process human language, identify meaning, and understand the sentiment behind words? This session introduced participants to Natural Language Processing (NLP), exploring the techniques that allow computers to work with textual data. From text preprocessing and tokenization to classification and sentiment analysis, participants discovered the foundations of a field that powers applications ranging from intelligent assistants to automated text analysis. The session opened a door into one of the most fascinating intersections of language and Artificial Intelligence." },
  { slug: "transformer", photos: 0, year: 2025, date: "8 Apr 2025", title: "Introduction to the Transformer Architecture", text: "Behind many of today's most powerful language models lies an architecture that transformed the field of Artificial Intelligence: the Transformer. This session took participants through its evolution, starting with traditional sequence models and exploring how attention and self-attention mechanisms allow Transformers to capture complex relationships in text without relying on recurrence. By examining the foundations behind models such as Claude, GPT, and BERT, participants gained a deeper understanding of the technology driving modern Large Language Models and the ideas that made this revolution possible." },
  { slug: "dataquest", photos: 3, year: 2025, date: "22–23 Feb 2025", title: "DataQuest – Data Science Competition", text: "Twenty-four hours to explore data, uncover patterns, and turn insights into solutions. DataQuest challenged teams to tackle real-world problems through the power of Data Science, moving from dataset exploration and analysis to predictive modeling and the presentation of data-driven insights. Under time pressure, participants combined technical skills, analytical thinking, and teamwork to transform raw information into meaningful results. The competition provided a practical environment where knowledge was tested, ideas were challenged, and data became the starting point for innovation." },
  { slug: "nvidia", photos: 3, year: 2025, date: "16 Feb 2025", title: "NVIDIA Workshop – Computer Vision for Industrial Inspection (Certified)", text: "What if machines could identify defects with the precision and speed required by modern industry? This certified, hands-on workshop introduced participants to the use of Computer Vision and deep learning in industrial inspection. Through practical use cases and NVIDIA tools, participants explored how intelligent vision systems can detect defects, automate visual quality control, and support more reliable inspection processes. The workshop connected AI concepts to real industrial applications, giving participants an opportunity to discover how computer vision can solve tangible engineering challenges." },
  { slug: "intro-cv", photos: 3, year: 2025, date: "5 Feb 2025", title: "Introduction to Computer Vision", text: "Teaching machines to see is one of the most fascinating challenges in Artificial Intelligence. This session introduced participants to the foundations of Computer Vision, exploring how digital images are represented and processed, how meaningful features can be extracted, and how machines learn to classify images and detect objects. Through these fundamental concepts, participants discovered the technologies behind applications such as image recognition, automated inspection, and intelligent visual systems." },
  { slug: "intro-ml", photos: 3, year: 2025, date: "29 Jan 2025", title: "Introduction to Machine Learning", text: "How can computers learn from data and make predictions without being explicitly programmed for every situation? This session introduced participants to Machine Learning, its relationship with Artificial Intelligence, and its growing range of real-world applications. Participants explored the three major learning paradigms — supervised, unsupervised, and reinforcement learning — while discovering the fundamental role of data, model training, and performance evaluation. It provided a foundation for understanding how intelligent systems learn, adapt, and make data-driven decisions." },
  { slug: "advancing-ai", photos: 1, year: 2021, date: "24 Nov 2021", title: "Advancing Through AI", text: "As part of the IEEE Region 8 Cross-Sectional Student Initiatives Booster Program, hosted by IEEE INSAT Student Branch, our chapter contributed to the program by leading the workshop Advancing IoT through AI. Led by Mouafek Ayedi, the session explored the fundamentals of Internet of Things and Artificial Intelligence, highlighting how these two fields can complement one another to create smarter and more connected systems. It was an opportunity to share technical knowledge, explore emerging technologies, and contribute to a broader IEEE learning initiative." },
  { slug: "webdev-2", photos: 3, year: 2021, date: "17 Nov 2021", title: "WebDev Workshop WEEK 2", text: "Building on the foundations introduced during the first week, our Web Development series continued with a dedicated session on CSS, the language that brings structure to life through design. Guided by our webmaster and a dedicated team of trainers, participants explored selectors, classes, IDs, properties, and the principles behind styling web pages. The session concluded with an interactive Kahoot quiz, combining friendly competition with knowledge reinforcement. Through this progressive learning experience, participants continued developing the skills needed to build and style their own web interfaces." },
  { slug: "webdev-1", photos: 3, year: 2021, date: "13 Nov 2021", title: "WebDev Workshop WEEK 1", text: "Every web developer starts somewhere, and our Web Development series began by introducing participants to the foundations of building for the web. The first session explored the roles of front-end and back-end development, alongside an introduction to computer networking fundamentals led by Oussema Ghorbel. Participants also discovered the basics of Git and HTML, gaining their first tools for creating and managing web projects. Beyond the technical content, the session encouraged interaction and connection between participants, creating a collaborative environment to learn, exchange ideas, and grow together throughout the series." },
  { slug: "xtreme-15", photos: 3, year: 2021, date: "22–23 Oct 2021", title: "IEEEXtreme 15", text: "Inspired by an Olympics theme, the INSAT edition of IEEEXtreme 15.0 transformed a 24-hour programming competition into a full night of challenges, community, and shared experiences. The event opened with remarks from the organizing committee and a live performance by a local band before participants headed into the competition space and began their programming journey. Between solving problems and racing against the clock, participants shared dinner, enjoyed games and a movie, and even found moments to rest. The experience brought together the competitive spirit of IEEEXtreme and the sense of community that makes these events memorable. Participant feedback reflected a highly satisfying experience, making the edition a success beyond the competition itself." },
  { slug: "ss-cp", photos: 3, year: 2021, date: "11–12 Sep 2021", title: "Summer School CP", text: "This Summer School session introduced participants to the world of Competitive Programming, exploring its history, purpose, and role in developing strong problem-solving skills. The trainer began by explaining the importance of programming competitions and introducing algorithmic complexity, helping participants understand how to evaluate the efficiency of their solutions. The session then moved into hands-on problem-solving, giving participants the opportunity to apply the concepts, tackle challenges, and strengthen their algorithmic thinking through practice." },
  { slug: "ss-flutter", photos: 3, year: 2021, date: "10–11 Sep 2021", title: "Summer School Flutter", text: "From discovering a framework to building a working mobile application, this Flutter workshop gave participants a practical introduction to app development. After exploring the core concepts of Flutter, the trainers guided participants through creating application pages, connecting interfaces, styling buttons and text, and implementing the logic behind interactive features. By the end of the workshop, everyone had built a working application of their own, turning theoretical concepts into a tangible result and experiencing the process of bringing a mobile app to life." },
];

// The 26/27 board. linkedin: full profile URL; email: the address to show publicly.
// Leave either empty ("") to hide that link; with both empty the card shows no contact tiles.
export const team = [
  { img: "marwen", name: "Marwen Agrebi", role: "Chair", linkedin: "https://www.linkedin.com/in/marwen-agrebi-207524417/", email: "agrebimarwen771@gmail.com" },
  { img: "kmar", name: "Kmar Ben Ayed", role: "Vice Chair Technical Activities", linkedin: "https://www.linkedin.com/in/kmar-b-b2026621a/", email: "kmarbenayed701@gmail.com" },
  { img: "achref", name: "Achref Antar", role: "Vice Chair Membership Activities", linkedin: "https://www.linkedin.com/in/achref-anter-136b0b351/", email: "anterachref3@gmail.com" },
  { img: "ghayth", name: "Ghayth Abidli", role: "Treasurer", linkedin: "https://www.linkedin.com/in/ghayth-abidli-a28970389/", email: "ghaythff0@gmail.com" },
  { img: "roudaina", name: "Roudaina Linoubli", role: "General Secretary", linkedin: "https://www.linkedin.com/in/roudaina-linoubli-836b19449/", email: "inoubliroudi@gmail.com" },
  { img: "ines", name: "Ines Fakhfakh", role: "Media Manager", linkedin: "https://www.linkedin.com/in/ines-fakhfakh-28b46033b/", email: "ines.fakhfakh@insat.ucar.tn" },
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
