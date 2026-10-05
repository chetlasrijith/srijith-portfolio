/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 *  Everything on this site reads from this file. Nothing is hardcoded in a
 *  component. Replace the mock values below with your real content — no other
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
  availability: 'Open to new roles — 2026',
  socials: [
    { label: 'GitHub', handle: '@chetlasrijith', url: 'https://github.com/chetlasrijith' },
    { label: 'LinkedIn', handle: 'in/srijithchetla', url: 'https://linkedin.com/in/srijithchetla' },
    { label: 'LeetCode', handle: '@thechetla', url: 'https://leetcode.com/u/thechetla/' },
  ],
  about: [
    'I build intelligent systems that turn messy, manual processes into things that can run on their own — from browser automation and data pipelines to computer vision systems that have to work outside a notebook.',
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
  "ACM-ICPC Regionalist",
  "Builder at Heart",
],
}

export type Project = {
  id: string
  index: string
  name: string
  year: string
  status: 'Live' | 'In production' | 'Archived' | 'Prototype'
  /** One line. Reads as the card's subhead at 18px. */
  summary: string
  /** The 36px editorial paragraph. Two or three sentences at most. */
  description: string
  stack: string[]
  highlights: string[]
  liveUrl: string | null
  repoUrl: string | null
  featured?: boolean
  /** Drives the mock preview panel so each card has a distinct silhouette. */
  preview: 'canvas' | 'streams' | 'queue' | 'terminal' | 'orbit'
  metrics?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: 'rift',
    index: '01',
    name: 'Rift',
    year: '2026',
    status: 'Live',
    summary: 'A multiplayer whiteboard where 200 cursors never fight.',
    description:
      'Rift is a CRDT-backed collaborative canvas. Every stroke, selection and cursor is a replicated operation, so a dropped websocket reconnects without a merge prompt. The hard part was not the CRDT — it was making presence feel instantaneous at 240ms.',
    stack: ['TypeScript', 'Rust', 'WebSocket', 'Yjs', 'React', 'Postgres'],
    highlights: [
      'Sub-40ms broadcast latency at 200 concurrent editors',
      'Conflict-free offline merge via a custom CRDT log',
      'Virtualised canvas holds 60fps above 12,000 shapes',
    ],
    liveUrl: 'https://rift.example.com',
    repoUrl: 'https://github.com/chetlasrijith/rift',
    featured: true,
    preview: 'canvas',
    metrics: [
      { label: 'Peak editors', value: '200' },
      { label: 'p95 latency', value: '38ms' },
      { label: 'Uptime', value: '99.98%' },
    ],
  },
  {
    id: 'pulse',
    index: '02',
    name: 'Pulse',
    year: '2025',
    status: 'In production',
    summary: 'Streaming observability that renders a million points without dropping a frame.',
    description:
      'A metrics and trace explorer for teams that were outgrowing their dashboards. Ingests a billion-row ClickHouse cluster, downsamples in the worker, and draws the result straight into a WebGL buffer so the browser never holds more than a screenful of data.',
    stack: ['Go', 'ClickHouse', 'WebGL', 'React', 'gRPC'],
    highlights: [
      'Server-side downsampling cut storage 40x with no visible loss',
      'WebGL scatter layer renders 1M points at 60fps',
      'Query builder that compiles straight to SQL, no dashboard YAML',
    ],
    liveUrl: 'https://pulse.example.com',
    repoUrl: 'https://github.com/chetlasrijith/pulse',
    featured: true,
    preview: 'streams',
    metrics: [
      { label: 'Points drawn', value: '1.2M' },
      { label: 'Ingest', value: '80k/s' },
      { label: 'Storage cut', value: '40x' },
    ],
  },
  {
    id: 'kestrel',
    index: '03',
    name: 'Kestrel',
    year: '2025',
    status: 'In production',
    summary: 'A durable job engine where retries are a type, not a config file.',
    description:
      'Kestrel is a workflow engine built around a small algebraic core: steps compose with then, retry, and fan-out, and the typechecker rejects the schedules that would page you at 3am. Backed by Redis streams, exactly-once in practice via idempotency keys.',
    stack: ['TypeScript', 'Node', 'Redis', 'BullMQ', 'Zod'],
    highlights: [
      'Step composition checked at compile time, not at 3am',
      'Idempotency keys make at-least-once delivery behave like once',
      'Zero-downtime deploys with in-flight job draining',
    ],
    liveUrl: 'https://kestrel.example.com',
    repoUrl: 'https://github.com/chetlasrijith/kestrel',
    preview: 'queue',
    metrics: [
      { label: 'Jobs / day', value: '2.4M' },
      { label: 'Retry safety', value: '100%' },
      { label: 'Deps', value: '1' },
    ],
  },
  {
    id: 'sift',
    index: '04',
    name: 'Sift',
    year: '2024',
    status: 'Live',
    summary: 'grep that understands your stack traces.',
    description:
      'A terminal tool and WASM library that fingerprints a stack trace, resolves it against your lockfile, and prints the one-line cause instead of forty lines of frames. Ships as a single static binary and as a 90KB browser build.',
    stack: ['Rust', 'WebAssembly', 'Tree-sitter'],
    highlights: [
      'Traces fingerprinted against a 4,000-entry error corpus',
      '90KB WASM build running the same matcher as the CLI',
      'Adopted by three teams and never asked to be removed',
    ],
    liveUrl: 'https://sift.example.com',
    repoUrl: 'https://github.com/chetlasrijith/sift',
    preview: 'terminal',
    metrics: [
      { label: 'Binary', value: '6.1MB' },
      { label: 'WASM', value: '90KB' },
      { label: 'Cold parse', value: '11ms' },
    ],
  },
  {
    id: 'orbit',
    index: '05',
    name: 'Orbit',
    year: '2024',
    status: 'Prototype',
    summary: 'A shader playground for shapes that should not be possible on a quad.',
    description:
      'Signed distance fields, marching cubes and a hand-written raymarcher in one page. Built to learn GLSL properly, then kept because turning a function into a solid turned out to be the most fun I had all year.',
    stack: ['GLSL', 'Three.js', 'TypeScript'],
    highlights: [
      'Raymarched SDF scene at 120fps on integrated graphics',
      'Live shader hot-reload with a uniform history panel',
      'Export any shape as a printable STL',
    ],
    liveUrl: 'https://orbit.example.com',
    repoUrl: 'https://github.com/chetlasrijith/orbit',
    preview: 'orbit',
    metrics: [
      { label: 'Fps', value: '120' },
      { label: 'Shader lines', value: '900' },
      { label: 'Deps', value: '1' },
    ],
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
    period: 'June 2026 — Present',
    location: 'Hyderabad, Telangana',
    summary:
      'Engineer an LLM-driven browser automation platform that clears background verification across third-party HR portals without a person in the loop.',
    points: [
      'Cut turnaround from 1 hour to 7 minutes — an 8.6× speedup across 1,000+ verification runs',
      'Containerised 5 services with Docker and orchestrated tasks through Celery + Redis across 20 concurrent workers, adding Playwright slot management, worker recycling and autoscaling',
      'Reduced average per-run time 25–50% (400s → 200–300s) through LLM-response caching, circuit breakers, HTTP connection pooling, retry tuning and error-page detection',
      'Built and modified 20+ REST APIs across verification and data-processing workflows, persisting job and result state to PostgreSQL and candidate documents to AWS S3',
      'Developed a 13-layer ERP data-preparation and forensic-analytics pipeline — 14 business modules, 163+ automated tests — flagging duplicate PAN/GSTIN records, PO splitting, Benford’s Law violations and segregation-of-duties conflicts across 120K+ rows',
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
      '“Underwater Plastic Waste Detection Using Deep Learning Techniques” — published in the IEEE GCON 2026 proceedings.',
  },
  {
    year: '2025',
    title: 'Amazon ML Summer School — top 5%',
    org: 'Amazon',
    detail: 'Selected among the top 5% of more than 60,000 applicants nationwide.',
  },
  {
    year: '2025',
    title: 'Winner — DataHack Hackathon',
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
