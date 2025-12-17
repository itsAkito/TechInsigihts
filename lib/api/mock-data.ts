// Mock data for testing without Supabase

// Tech Domains (replacing categories)
export const TECH_DOMAINS = [
  { id: '1', name: 'AI', slug: 'ai', description: 'Artificial Intelligence, Machine Learning, and LLMs', color: 'bg-blue-500' },
  { id: '2', name: 'SaaS', slug: 'saas', description: 'Software as a Service, Cloud Products, and Platforms', color: 'bg-purple-500' },
  { id: '3', name: 'UX', slug: 'ux', description: 'User Experience, Design, and Interface Design', color: 'bg-pink-500' },
  { id: '4', name: 'Cybersecurity', slug: 'cybersecurity', description: 'Security, Privacy, and Data Protection', color: 'bg-red-500' },
  { id: '5', name: 'Emerging Tech', slug: 'emerging-tech', description: 'Web3, Blockchain, Quantum Computing, and More', color: 'bg-green-500' },
];

// Keep MOCK_CATEGORIES for backward compatibility
export const MOCK_CATEGORIES = TECH_DOMAINS;

export const MOCK_BLOGS = [
  {
    id: '1',
    title: 'The Rise of Generative AI in 2025',
    slug: 'generative-ai-2025',
    excerpt: 'How generative AI is transforming industries and what to expect',
    content: '# Generative AI in 2025\n\nGenerative AI continues to evolve...',
    author_id: 'mock-user-id',
    author_name: 'Admin User',
    category_id: '1',
    category_name: 'AI',
    views: 234,
    created_at: new Date('2024-12-10').toISOString(),
    updated_at: new Date('2024-12-10').toISOString(),
    published: true,
    cover_image: null,
    image_url: 'https://images.unsplash.com/photo-1677442d019cecf8e4b58c6d0cb3b19382f78815?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'SaaS Pricing Strategies That Work',
    slug: 'saas-pricing-strategies',
    excerpt: 'Learn the most effective SaaS pricing models for your business',
    content: '# SaaS Pricing Strategies\n\nChoosing the right pricing...',
    author_id: 'mock-user-id',
    author_name: 'Admin User',
    category_id: '2',
    category_name: 'SaaS',
    views: 189,
    created_at: new Date('2024-12-08').toISOString(),
    updated_at: new Date('2024-12-08').toISOString(),
    published: true,
    cover_image: null,
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

// Quizzes
export const MOCK_QUIZZES = [
  {
    id: '1',
    title: 'AI Fundamentals Quiz',
    slug: 'ai-fundamentals-quiz',
    description: 'Test your knowledge of AI basics and concepts',
    domain: 'AI',
    difficulty: 'beginner',
    created_at: new Date('2024-12-01').toISOString(),
    published: true,
    questions: [
      {
        id: '1',
        question: 'What does AI stand for?',
        options: ['Artificial Intelligence', 'Applied Information', 'Automated Integration', 'Adaptive Internet'],
        correctAnswer: 0,
      },
      {
        id: '2',
        question: 'Which of these is a type of machine learning?',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'All of the above'],
        correctAnswer: 3,
      },
      {
        id: '3',
        question: 'What is a neural network inspired by?',
        options: ['Computer networks', 'Human brain', 'Quantum computing', 'Cloud systems'],
        correctAnswer: 1,
      },
    ],
    totalAttempts: 342,
    averageScore: 72,
  },
  {
    id: '2',
    title: 'Cybersecurity Essentials',
    slug: 'cybersecurity-essentials',
    description: 'Understand core cybersecurity principles',
    domain: 'Cybersecurity',
    difficulty: 'intermediate',
    created_at: new Date('2024-12-02').toISOString(),
    published: true,
    questions: [
      {
        id: '1',
        question: 'What is the primary goal of encryption?',
        options: ['Speed up networks', 'Protect data confidentiality', 'Increase storage', 'Reduce power consumption'],
        correctAnswer: 1,
      },
      {
        id: '2',
        question: 'Which attack involves sending malicious links?',
        options: ['DDoS', 'Phishing', 'Ransomware', 'Malware'],
        correctAnswer: 1,
      },
    ],
    totalAttempts: 215,
    averageScore: 68,
  },
];

// Polls
export const MOCK_POLLS = [
  {
    id: '1',
    title: 'Which AI tool do you use most?',
    description: 'Share your favorite AI assistant',
    domain: 'AI',
    created_at: new Date('2024-12-15').toISOString(),
    options: [
      { id: '1', text: 'ChatGPT', votes: 245 },
      { id: '2', text: 'Claude', votes: 189 },
      { id: '3', text: 'Gemini', votes: 156 },
      { id: '4', text: 'Other', votes: 98 },
    ],
    totalVotes: 688,
  },
  {
    id: '2',
    title: 'What\'s your biggest cybersecurity concern?',
    description: 'Vote on your top security worry',
    domain: 'Cybersecurity',
    created_at: new Date('2024-12-14').toISOString(),
    options: [
      { id: '1', text: 'Data breaches', votes: 342 },
      { id: '2', text: 'Ransomware', votes: 213 },
      { id: '3', text: 'Insider threats', votes: 167 },
      { id: '4', text: 'Supply chain attacks', votes: 134 },
    ],
    totalVotes: 856,
  },
];

// Forum Discussions
export const MOCK_FORUM_THREADS = [
  {
    id: '1',
    title: 'Best practices for implementing RAG systems',
    slug: 'rag-systems-best-practices',
    domain: 'AI',
    author: 'TechLead',
    created_at: new Date('2024-12-14').toISOString(),
    updated_at: new Date('2024-12-14').toISOString(),
    views: 324,
    replies: 12,
    tags: ['ai', 'llm', 'rag'],
    content: 'I\'ve been working with RAG systems and wanted to share some best practices...',
    pinned: true,
  },
  {
    id: '2',
    title: 'UX Design for accessibility - experiences?',
    slug: 'ux-accessibility-discussion',
    domain: 'UX',
    author: 'DesignMaster',
    created_at: new Date('2024-12-12').toISOString(),
    updated_at: new Date('2024-12-14').toISOString(),
    views: 189,
    replies: 8,
    tags: ['ux', 'accessibility', 'wcag'],
    content: 'What strategies have worked best for you when designing accessible UIs?',
    pinned: false,
  },
  {
    id: '3',
    title: 'Zero-trust architecture implementation',
    slug: 'zero-trust-implementation',
    domain: 'Cybersecurity',
    author: 'SecurityExpert',
    created_at: new Date('2024-12-10').toISOString(),
    updated_at: new Date('2024-12-13').toISOString(),
    views: 412,
    replies: 15,
    tags: ['security', 'zero-trust', 'infrastructure'],
    content: 'Transitioning to zero-trust architecture? Share your experiences and challenges...',
    pinned: true,
  },
];

// AMAs (Ask Me Anything)
export const MOCK_AMAS = [
  {
    id: '1',
    title: 'Ask an AI Research Lead - Building LLMs',
    slug: 'llm-research-ama',
    expert: 'Dr. Sarah Chen',
    expertise: 'AI Research, LLM Development',
    domain: 'AI',
    scheduledDate: new Date('2024-12-20').toISOString(),
    status: 'upcoming',
    questions: [
      {
        id: '1',
        question: 'What\'s the biggest challenge in training LLMs?',
        answer: 'The biggest challenge is managing computational costs and data quality...',
        votes: 234,
      },
      {
        id: '2',
        question: 'How do you approach prompt engineering?',
        answer: 'Prompt engineering is both an art and a science...',
        votes: 189,
      },
    ],
    totalQuestions: 47,
  },
  {
    id: '2',
    title: 'Ask a SaaS Founder - Building Profitable Products',
    slug: 'saas-founder-ama',
    expert: 'Marcus Johnson',
    expertise: 'SaaS Entrepreneurship, Product-Market Fit',
    domain: 'SaaS',
    scheduledDate: new Date('2024-12-18').toISOString(),
    status: 'live',
    questions: [
      {
        id: '1',
        question: 'How did you validate product-market fit?',
        answer: 'We talked to 100+ potential customers before building...',
        votes: 423,
      },
    ],
    totalQuestions: 89,
  },
];

// Trend Analysis
export const MOCK_TRENDS = [
  {
    id: '1',
    title: 'The AI Boom: Market Analysis and Predictions',
    slug: 'ai-market-trends-2025',
    domain: 'AI',
    type: 'trend-analysis',
    created_at: new Date('2024-12-10').toISOString(),
    author: 'MarketAnalyst',
    content: 'The AI market is experiencing unprecedented growth...',
    metrics: {
      marketSize: '$196.63B',
      growthRate: '38.1% CAGR',
      forecast: '$1.81 Trillion by 2030',
    },
    keyTrends: [
      'Adoption of generative AI in enterprises',
      'Edge AI and on-device models',
      'AI governance and regulation',
      'Multimodal AI systems',
    ],
    views: 523,
  },
  {
    id: '2',
    title: 'Cybersecurity Threat Landscape 2025',
    slug: 'cybersecurity-threats-2025',
    domain: 'Cybersecurity',
    type: 'trend-analysis',
    created_at: new Date('2024-12-08').toISOString(),
    author: 'SecurityAnalyst',
    content: 'The threat landscape continues to evolve...',
    metrics: {
      breachesPerDay: 2,
      averageCostPerBreach: '$4.45M',
      industryMostTargeted: 'Healthcare',
    },
    keyTrends: [
      'AI-powered cyber attacks',
      'Supply chain targeting',
      'Cloud security challenges',
      'Regulatory compliance pressure',
    ],
    views: 412,
  },
];

// Case Studies
export const MOCK_CASE_STUDIES = [
  {
    id: '1',
    title: 'How Netflix Uses AI for Recommendations',
    slug: 'netflix-ai-case-study',
    domain: 'AI',
    type: 'case-study',
    company: 'Netflix',
    created_at: new Date('2024-12-05').toISOString(),
    author: 'CaseStudyAuthor',
    challenge: 'Delivering personalized content to millions of users',
    solution: 'Implementing advanced ML algorithms and collaborative filtering',
    results: {
      engagement: '+25% increase',
      retention: '+15% improvement',
      satisfaction: '4.8/5 rating',
    },
    content: 'Netflix\'s recommendation system is one of the most sophisticated...',
    views: 645,
  },
  {
    id: '2',
    title: 'Stripe: From Startup to $95B Unicorn',
    slug: 'stripe-saas-case-study',
    domain: 'SaaS',
    type: 'case-study',
    company: 'Stripe',
    created_at: new Date('2024-12-03').toISOString(),
    author: 'CaseStudyAuthor',
    challenge: 'Building payment infrastructure for the internet',
    solution: 'Developer-first approach with excellent API design',
    results: {
      users: '1M+ developers',
      revenue: '$14B+ annualized',
      markets: '195+ countries',
    },
    content: 'Stripe\'s journey from Y Combinator to industry leader...',
    views: 812,
  },
];

// Predictions/Future Tech
export const MOCK_PREDICTIONS = [
  {
    id: '1',
    title: 'The Future of AI: 5-Year Predictions',
    slug: 'ai-future-predictions',
    domain: 'AI',
    type: 'prediction',
    created_at: new Date('2024-12-12').toISOString(),
    author: 'TechFuturist',
    content: 'Looking ahead 5 years in AI development...',
    predictions: [
      {
        year: 2025,
        prediction: 'AI assistants become standard in enterprise software',
        confidence: 95,
      },
      {
        year: 2026,
        prediction: 'AGI debates move from theoretical to practical',
        confidence: 60,
      },
      {
        year: 2027,
        prediction: 'AI governance frameworks standardized globally',
        confidence: 75,
      },
      {
        year: 2028,
        prediction: 'Multimodal AI becomes the norm, not the exception',
        confidence: 88,
      },
      {
        year: 2029,
        prediction: 'AI-human collaboration is standard in knowledge work',
        confidence: 92,
      },
    ],
    views: 523,
  },
  {
    id: '2',
    title: 'Web3 and Blockchain: Where We\'re Headed',
    slug: 'web3-future-predictions',
    domain: 'Emerging Tech',
    type: 'prediction',
    created_at: new Date('2024-12-09').toISOString(),
    author: 'Web3Expert',
    content: 'The evolution of decentralized technologies...',
    predictions: [
      {
        year: 2025,
        prediction: 'CBDCs launch in 15+ countries',
        confidence: 88,
      },
      {
        year: 2026,
        prediction: 'Layer 2 solutions reach 100M active users',
        confidence: 72,
      },
      {
        year: 2027,
        prediction: 'Smart contracts become mainstream in business',
        confidence: 65,
      },
    ],
    views: 334,
  },
];

export const MOCK_COMMENTS = [
  {
    id: '1',
    blog_id: '1',
    author_id: 'user-1',
    author_name: 'John Doe',
    content: 'Great tutorial! Very helpful.',
    approved: true,
    created_at: new Date('2024-12-11').toISOString(),
  },
  {
    id: '2',
    blog_id: '1',
    author_id: 'user-2',
    author_name: 'Jane Smith',
    content: 'Thanks for sharing this knowledge.',
    approved: false,
    created_at: new Date('2024-12-12').toISOString(),
  },
];

export const MOCK_ANALYTICS = {
  totalViews: 1523,
  totalBlogs: 15,
  totalComments: 42,
  totalCategories: 8,
  weeklyStats: [
    { week: 'Week 1', posts: 2, views: 234, comments: 5 },
    { week: 'Week 2', posts: 3, views: 456, comments: 12 },
    { week: 'Week 3', posts: 1, views: 189, comments: 8 },
    { week: 'Week 4', posts: 4, views: 644, comments: 17 },
  ],
  categoryStats: [
    { name: 'React', count: 3, views: 456 },
    { name: 'Next.js', count: 2, views: 234 },
    { name: 'TypeScript', count: 2, views: 167 },
    { name: 'Web Development', count: 3, views: 389 },
    { name: 'CSS & Design', count: 2, views: 145 },
    { name: 'DevOps', count: 2, views: 132 },
  ],
};
