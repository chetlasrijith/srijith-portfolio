/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 *  Everything on this site reads from this file. Nothing is hardcoded in a
 *  component. Replace the mock values below with your real content. No other
 *  file needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Srijith Chetla',
  /** The 96px sculptural hero block. Keep it 2–3 words. */
  headline: ['Srijith', 'Chetla'],
  role: 'AI / ML Engineer',
  /** Rotates in the hero terminal line. */
  roles: [
    'AI / ML Engineer',
    'LLM Automation & Computer Vision',
    'Python · TensorFlow · PyTorch',
    'Computer Science · Data Science',
  ],
  location: 'Hyderabad, Telangana',
  timezone: 'Asia/Kolkata',
  email: 'chetlasrijith@gmail.com',
  phone: '+91 70324 40444',
  resumeUrl: '/srijith_resume.pdf',
  resumeFileName: 'srijith_resume.pdf',
  availability: 'Open to new roles in 2026',
  socials: [
    { label: 'GitHub', handle: '@chetlasrijith', url: 'https://github.com/chetlasrijith' },
    { label: 'LinkedIn', handle: 'in/srijithchetla', url: 'https://linkedin.com/in/srijithchetla' },
    { label: 'LeetCode', handle: '@thechetla', url: 'https://leetcode.com/u/thechetla/' },
  ],
  about: [
    'I build intelligent systems that turn messy, manual processes into things that can run on their own, from browser automation and data pipelines to computer vision systems that have to work outside a notebook.',
    'Most of my work sits somewhere between machine learning and engineering. I like taking models out of isolation and giving them the infrastructure they need to be useful: concurrency, APIs, caching, fault tolerance, observability, and the occasional battle with a system that was never designed to be automated.',
    'I’m particularly drawn to problems where the interesting part isn’t getting something to work once, but making it fast, reliable, and resilient enough that other people can stop thinking about it. Outside of that, I spend an unreasonable amount of time solving problems, experimenting with new tools, and building things simply because I want to understand how they work. That curiosity has also taken me to the ACM-ICPC Asia Amritapuri Regionals.',
  ],
  /** The quiet authority band. Grayscale, no hover states. */
marquee: [
  "AI Engineering",
  "Intelligent Automation",
  "Distributed Systems",
  "Computer Vision",
  "LLM Systems",
  "Backend Engineering",
  "Performance Optimization",
  "Competitive Programming",
],
}

export type Project = {
  id: string
  index: string
  name: string
  year: string
  status: 'Planned' | 'Live' | 'In production' | 'Archived' | 'Prototype'
  /** One line. Reads as the card's subhead at 18px. */
  summary: string
  /** The 36px editorial paragraph. Two or three sentences at most. */
  description: string
  stack: string[]
  highlights: string[]
  imageUrl: string
  imageAlt: string
  imageCredit?: string
  liveUrl: string | null
  repoUrl: string | null
  featured?: boolean
  /** Drives the mock preview panel so each card has a distinct silhouette. */
  preview: 'canvas' | 'streams' | 'queue' | 'terminal' | 'orbit'
  metrics?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: 'shadow-leak-detector',
    index: '01',
    name: 'ShadowLeakDetector',
    year: '2026',
    status: 'Planned',
    summary: 'A security and privacy project currently in the planning stage.',
    description:
      'This project has not been implemented yet. Its detection scope, interface, and technical approach are still being defined.',
    stack: [],
    highlights: [],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Abstract cybersecurity scene with a glowing digital lock',
    liveUrl: null,
    repoUrl: 'https://github.com/chetlasrijith/ShadowLeakDetector',
    preview: 'terminal',
  },
  {
    id: 'retina-vision-ai',
    index: '02',
    name: 'RetinaVision AI',
    year: '2026',
    status: 'Prototype',
    summary: 'Deep learning models classify retinal scans across six eye conditions.',
    description:
      'RetinaVision AI combines convolutional neural networks and Vision Transformers with a Streamlit app for retinal image predictions. The README describes a roughly 50,000-image dataset and a GPU-supported training workflow.',
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Streamlit', 'Vision Transformers'],
    highlights: [
      'Classifies AMD, cataract, diabetic retinopathy, glaucoma, pathological myopia, and normal scans',
      'Includes a Streamlit application for image uploads and predictions',
      'Training notebooks cover CNN and Vision Transformer approaches',
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Retinal_detachment_in_Von_Hippel-Lindau_disease.jpg',
    imageAlt: 'Public-domain retinal fundus photograph from the National Eye Institute',
    imageCredit: 'Image: National Eye Institute, public domain',
    liveUrl: null,
    repoUrl: 'https://github.com/chetlasrijith/RetinaVision-AI',
    preview: 'streams',
  },
  {
    id: 'eco-bot',
    index: '03',
    name: 'EcoBot',
    year: '2025',
    status: 'Prototype',
    summary: 'YOLOv8 detects underwater plastic and maps detections by location.',
    description:
      'EcoBot analyzes uploaded underwater images, reports detection confidence and plastic levels, and visualizes mapped locations. The app also supports downloading images annotated with detections.',
    stack: ['React', 'TypeScript', 'Python', 'YOLOv8', 'Leaflet', 'OpenStreetMap'],
    highlights: [
      'Detects plastic objects in underwater images',
      'Shows confidence scores and plastic-level summaries',
      'Plots detection locations on a global map',
    ],
    imageUrl: 'https://raw.githubusercontent.com/chetlasrijith/eco-bot/main/assets/3.png',
    imageAlt: 'EcoBot screenshot showing underwater plastic detection results',
    imageCredit: 'Project screenshot',
    liveUrl: null,
    repoUrl: 'https://github.com/chetlasrijith/eco-bot',
    preview: 'queue',
  },
  {
    id: 'event-sphere',
    index: '04',
    name: 'EventSphere',
    year: '2026',
    status: 'Prototype',
    summary: 'A role-based platform for organizing events, registrations, and tickets.',
    description:
      'EventSphere is a MERN event-management platform with JWT authentication and separate attendee, organizer, and admin roles. It supports event management, ticket registration, image uploads, and an organizer dashboard.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    highlights: [
      'Role-based accounts for attendees, organizers, and admins',
      'Event creation, registration, and ticket management',
      'Protected API routes and organizer dashboard',
    ],
    imageUrl: 'https://raw.githubusercontent.com/chetlasrijith/EventSphere/main/frontend/public/images/banner.webp',
    imageAlt: 'EventSphere event platform banner',
    imageCredit: 'Project image',
    liveUrl: null,
    repoUrl: 'https://github.com/chetlasrijith/EventSphere',
    preview: 'canvas',
  },
]

export type SmallProject = {
  name: string
  note: string
  repoUrl: string
}

export const smallProjects: SmallProject[] = [
  {
    name: 'Neural Networks From Scratch',
    note: 'A NumPy-only MNIST classifier with forward propagation, backpropagation, ReLU, and softmax. The README reports about 85% development-set accuracy.',
    repoUrl: 'https://github.com/chetlasrijith/NeuralNetworks_FromScratch',
  },
  {
    name: 'Retail Price Analysis and Prediction',
    note: 'Analyzes 118,482 retail prices from 2017 to 2025 with trend analysis, anomaly detection, regression, and price-level classification.',
    repoUrl: 'https://github.com/chetlasrijith/Retail-Price-Analysis-and-Prediction',
  },
  {
    name: 'Coding Contest Reminders',
    note: 'A Python scheduler that sends WhatsApp reminders five minutes before coding contests listed in a CSV file.',
    repoUrl: 'https://github.com/chetlasrijith/Coding-Contest-Reminders',
  },
]

export type Role = {
  company: string
  title: string
  period: string
  location: string
  summary: string
  points: string[]
  stack: string[]
}

export const experience: Role[] = [
  {
    company: 'Deloitte',
    title: 'AI Intern',
    period: 'June 2026 to Present',
    location: 'Hyderabad, Telangana',
    summary:
      'Built AI-powered enterprise automation systems using Python, FastAPI, LangGraph, PostgreSQL, and LLMs. Worked across agentic workflows, data pipelines, document processing, API development, and intelligent automation, integrating AI capabilities into production business processes.',
    points: [
      'Engineered an LLM-driven browser-automation platform that automates background verification across third-party HR portals',
      'Cut turnaround from 1 hour to 7 minutes, an 8.6× speedup across 1,000+ verification runs',
      'Containerised 5 services with Docker and orchestrated tasks through Celery + Redis across 20 concurrent workers, adding Playwright slot management, worker recycling and autoscaling',
      'Reduced average per-run time 25–50% (400s → 200–300s) through LLM-response caching, circuit breakers, HTTP connection pooling, retry tuning and error-page detection',
      'Built and modified 20+ REST APIs across verification and data-processing workflows, persisting job and result state to PostgreSQL and candidate documents to AWS S3',
      'Developed a 13-layer ERP data-preparation and forensic-analytics pipeline with 14 business modules and 163+ automated tests. It flags duplicate PAN/GSTIN records, PO splitting, Benford’s Law violations and segregation-of-duties conflicts across 120K+ rows.',
    ],
    stack: ['Python', 'asyncio', 'Playwright', 'browser-use', 'Celery', 'Redis', 'PostgreSQL', 'AWS S3', 'Docker'],
  },
]

export type Achievement = {
  year: string
  title: string
  org: string
  detail: string
}

export const achievements: Achievement[] = [
  {
    year: '2026',
    title: 'LeetCode Knight', 
    org: 'LeetCode',
    detail: 'Achieved a contest rating of 1903.',
  },
  {
    year: '2026',
    title: 'Qualified for the regional round',
    org: 'ACM-ICPC Asia Amritapuri',
    detail: 'Advanced through qualification into the Asia Amritapuri regional.',
  },
  {
    year: '2026',
    title: 'Research paper accepted',
    org: 'IEEE GCON 2026',
    detail:
      '“Underwater Plastic Waste Detection Using Deep Learning Techniques,” published in the IEEE GCON 2026 proceedings.',
  },
  {
    year: '2025',
    title: 'Amazon ML Summer School, top 5%',
    org: 'Amazon',
    detail: 'Selected among the top 5% of more than 60,000 applicants nationwide.',
  },
  {
    year: '2025',
    title: 'Winner of the DataHack Hackathon',
    org: 'Dept. of CSE (Data Science)',
    detail:
      'First place in the DataHack hackathon at Vardhaman College of Engineering.',
  },
]

export type Certification = {
  title: string
  issuer: string
  year: string
}

export const certifications: Certification[] = [
  {
    title: 'Claude Certified Architect – Professional (CCAR-P)',
    issuer: 'Anthropic',
    year: '2026',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'Stanford Online · Coursera',
    year: '2025',
  },
  {
    title: 'Data Analysis with Python',
    issuer: 'IBM · Coursera',
    year: '2025',
  },
]

export type SkillGroup = {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'SQL', 'Java', 'JavaScript'] },
  {
    label: 'ML / AI',
    items: [
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Keras',
      'LangChain',
      'LangGraph',
      'LLMs',
      'RAG',
      'Agentic AI',
    ],
  },
  {
    label: 'Data & Databases',
    items: ['NumPy', 'Pandas', 'PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    label: 'Backend & Frontend',
    items: ['FastAPI', 'Django', 'Flask', 'React', 'REST APIs', 'Celery'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (S3, EC2, IAM)', 'Docker', 'Git / GitHub', 'Postman'],
  },
  {
    label: 'Automation',
    items: ['Playwright', 'browser-use', 'Docling', 'vLLM', 'OCR'],
  },
]

export const codeChefProfile = {
  handle: 'thechetla',
  url: 'https://www.codechef.com/users/thechetla',
  rating: 1519,
  checkedAt: 'Oct 5, 2026',
}
