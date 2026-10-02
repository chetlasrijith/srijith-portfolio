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
  role: 'Software Engineer',
  /** Rotates in the hero terminal line. */
  roles: [
    'Software Engineer',
    'Backend & Distributed Systems',
    'TypeScript · Go · Rust',
    'Problem Solver',
  ],
  location: 'Hyderabad, India',
  timezone: 'Asia/Kolkata',
  email: 'srijithchetla@example.com',
  phone: '+91 98765 43210',
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Srijith-Chetla-Resume.pdf',
  availability: 'Open to new roles — 2026',
  socials: [
    { label: 'GitHub', handle: '@srijithchetla', url: 'https://github.com' },
    { label: 'LinkedIn', handle: 'in/srijithchetla', url: 'https://linkedin.com' },
    { label: 'LeetCode', handle: '@srijithchetla', url: 'https://leetcode.com' },
    { label: 'Codeforces', handle: '@chetla', url: 'https://codeforces.com' },
  ],
  about: [
    'I build systems that stay calm under load — schedulers, streaming pipelines and developer tooling that other engineers get to forget about.',
    'Most of my work lives at the seam between a typed interface and the distributed machinery behind it. I care about the shape of an API more than the number of lines it takes to ship it, and about the six months after launch more than the launch itself.',
    'Outside of work I keep a long-running problem solving streak, write about the things that broke, and rebuild my own tools far more often than is strictly healthy.',
  ],
  /** The quiet authority band. Grayscale, no hover states. */
  marquee: [
    'PROBLEMS SOLVED',
    'CURRENT STREAK',
    'LEETCODE RATING',
    'SHIPPED PROJECTS',
    'CONTRIBUTIONS',
    'OPEN TO WORK',
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
    repoUrl: 'https://github.com/srijithchetla/rift',
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
    repoUrl: 'https://github.com/srijithchetla/pulse',
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
    repoUrl: 'https://github.com/srijithchetla/kestrel',
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
    repoUrl: 'https://github.com/srijithchetla/sift',
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
    repoUrl: 'https://github.com/srijithchetla/orbit',
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
    company: 'Meridian Systems',
    title: 'Senior Software Engineer',
    period: '2024 — Present',
    location: 'Hyderabad',
    summary:
      'Own the scheduling and ingestion layer behind a real-time data product used by 40+ internal teams.',
    points: [
      'Rewrote the job scheduler in Go, cutting p99 queue latency from 4.1s to 210ms',
      'Led the migration off a self-managed Kafka cluster to a partition-per-tenant model',
      'Mentor two engineers; run a weekly design review nobody is allowed to skip',
    ],
    stack: ['Go', 'TypeScript', 'Kafka', 'Postgres'],
  },
  {
    company: 'Corvus Labs',
    title: 'Software Engineer',
    period: '2022 — 2024',
    location: 'Bengaluru',
    summary:
      'Built the developer-facing SDK and internal tooling for a payments platform.',
    points: [
      'Shipped an idempotent payments SDK adopted by 90% of merchant integrations',
      'Cut cold start 62% by replacing a reflection-based router with compiled handlers',
      'Authored the incident playbook that halved mean time to recovery',
    ],
    stack: ['TypeScript', 'Node', 'Redis', 'AWS'],
  },
  {
    company: 'Independent',
    title: 'Freelance Engineer',
    period: '2020 — 2022',
    location: 'Remote',
    summary:
      'Built data tooling and internal dashboards for small teams who had outgrown spreadsheets.',
    points: [
      'Delivered 11 projects end to end, from schema design to the deploy pipeline',
      'Converted three clients from nightly CSV exports to live dashboards',
    ],
    stack: ['Python', 'React', 'Postgres'],
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
    title: 'Top 3% globally',
    org: 'LeetCode Contest',
    detail: 'Rated 1786 — 412 contests, best finish 41st of 18,400.',
  },
  {
    year: '2025',
    title: 'Grandmaster, Codeforces',
    org: 'Codeforces',
    detail: 'Crossed 1500 rating and held it across three consecutive seasons.',
  },
  {
    year: '2025',
    title: 'Speaker, Config',
    org: 'Config India',
    detail: '"Backpressure for people who did not know they had one" — 400 attendees.',
  },
  {
    year: '2024',
    title: 'Best Engineer of the Year',
    org: 'Corvus Labs',
    detail: 'For the payments SDK rewrite and the incident playbook that followed.',
  },
  {
    year: '2023',
    title: 'Hackathon winner',
    org: 'Smart India Hackathon',
    detail: 'Built a real-time crop-disease triage app for low-connectivity farms.',
  },
]

/* ── The ledger: every number the charts render ────────────────────────────── */

export const codingStats = {
  headline: {
    totalSolved: 614,
    currentStreak: 46,
    longestStreak: 121,
    totalContributions: 1284,
    topPercent: 3,
  },

  /** Difficulty ladder — the only indigo in the entire chart set sits on Hard. */
  difficulty: {
    easy: { label: 'Easy', count: 412, note: 'Mostly warm-ups. Some of them were not.' },
    medium: { label: 'Medium', count: 168, note: 'Where the actual thinking happens.' },
    hard: { label: 'Hard', count: 34, note: 'The ones worth writing down.' },
  },

  /** Thin SVG arcs. Track is graphite, value is paper, the head gets one dot. */
  ratings: [
    { platform: 'LeetCode', handle: '@srijithchetla', rating: 1786, max: 2000, percentile: 'Top 3%' },
    { platform: 'Codeforces', handle: '@chetla', rating: 1521, max: 2000, percentile: 'Master' },
    { platform: 'CodeChef', handle: '@chetla', rating: 1874, max: 2100, percentile: 'Top 1.4%' },
  ],

  /** 12 months, problems solved per month. */
  monthly: [
    { month: 'Nov', leetcode: 34, codeforces: 12, other: 6 },
    { month: 'Dec', leetcode: 41, codeforces: 18, other: 8 },
    { month: 'Jan', leetcode: 29, codeforces: 22, other: 5 },
    { month: 'Feb', leetcode: 38, codeforces: 15, other: 11 },
    { month: 'Mar', leetcode: 47, codeforces: 26, other: 9 },
    { month: 'Apr', leetcode: 33, codeforces: 19, other: 14 },
    { month: 'May', leetcode: 52, codeforces: 31, other: 7 },
    { month: 'Jun', leetcode: 44, codeforces: 24, other: 12 },
    { month: 'Jul', leetcode: 58, codeforces: 28, other: 16 },
    { month: 'Aug', leetcode: 49, codeforces: 34, other: 10 },
    { month: 'Sep', leetcode: 63, codeforces: 29, other: 13 },
    { month: 'Oct', leetcode: 55, codeforces: 36, other: 18 },
  ],

  languages: [
    { name: 'TypeScript', pct: 42 },
    { name: 'Python', pct: 24 },
    { name: 'Go', pct: 14 },
    { name: 'Rust', pct: 9 },
    { name: 'SQL', pct: 7 },
    { name: 'Other', pct: 4 },
  ],

  contribution: {
    /** 53 weeks × 7 days, 0–4. Index 0 is the oldest day. */
    weeks: 53,
    days: 7,
    /** The one day that gets the single accent colour. */
    recordStreakIndex: 268,
  },
}