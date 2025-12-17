// Minimal admin-created mock data
// This represents data created by admins

export const ADMIN_CREATED_BLOGS = [
  {
    id: 'blog-admin-1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-next-js',
    excerpt: 'Learn the basics of Next.js and build your first application',
    content: '# Next.js Basics\n\nNext.js is a React framework...',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author_id: 'admin',
    author_name: 'Admin',
    views: 124,
    created_at: new Date('2024-12-15').toISOString(),
    updated_at: new Date('2024-12-15').toISOString(),
    published: true,
  },
  {
    id: 'blog-admin-2',
    title: 'Understanding React Hooks',
    slug: 'understanding-react-hooks',
    excerpt: 'Deep dive into React Hooks and how to use them effectively',
    content: '# React Hooks\n\nHooks allow you to use state...',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author_id: 'admin',
    author_name: 'Admin',
    views: 89,
    created_at: new Date('2024-12-14').toISOString(),
    updated_at: new Date('2024-12-14').toISOString(),
    published: true,
  },
];

export const ADMIN_CREATED_QUIZZES = [
  {
    id: 'quiz-admin-1',
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React basics',
    questions: [
      {
        id: '1',
        question: 'What is React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A backend framework',
          'A database',
          'A CSS framework',
        ],
        correct_answer: 0,
      },
      {
        id: '2',
        question: 'What is JSX?',
        options: [
          'Java Syntax eXtension',
          'JavaScript XML syntax extension',
          'A new programming language',
          'A styling library',
        ],
        correct_answer: 1,
      },
    ],
    created_by: 'admin',
    author: 'Admin',
    created_at: new Date('2024-12-15').toISOString(),
    published: true,
  },
  {
    id: 'quiz-admin-2',
    title: 'JavaScript ES6 Challenge',
    description: 'Test your ES6 knowledge',
    questions: [
      {
        id: '1',
        question: 'What is the purpose of arrow functions?',
        options: [
          'To style elements',
          'To create shorthand function syntax',
          'To manage state',
          'To handle routing',
        ],
        correct_answer: 1,
      },
    ],
    created_by: 'admin',
    author: 'Admin',
    created_at: new Date('2024-12-14').toISOString(),
    published: true,
  },
];

export const ADMIN_CREATED_POLLS = [
  {
    id: 'poll-admin-1',
    question: 'What is your favorite frontend framework?',
    options: [
      { id: 'opt-1', text: 'React', votes: 45 },
      { id: 'opt-2', text: 'Vue', votes: 23 },
      { id: 'opt-3', text: 'Angular', votes: 18 },
      { id: 'opt-4', text: 'Svelte', votes: 14 },
    ],
    created_by: 'admin',
    author: 'Admin',
    created_at: new Date('2024-12-15').toISOString(),
    published: true,
  },
  {
    id: 'poll-admin-2',
    question: 'Which programming language are you learning?',
    options: [
      { id: 'opt-1', text: 'JavaScript', votes: 56 },
      { id: 'opt-2', text: 'Python', votes: 42 },
      { id: 'opt-3', text: 'TypeScript', votes: 38 },
      { id: 'opt-4', text: 'Go', votes: 15 },
    ],
    created_by: 'admin',
    author: 'Admin',
    created_at: new Date('2024-12-14').toISOString(),
    published: true,
  },
];
