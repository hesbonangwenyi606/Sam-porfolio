export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: number; // minutes
  date: string; // ISO
  image: string;
  content: string; // markdown
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-scalable-react-apps',
    title: 'Building Scalable React Apps: Patterns I Use Every Day',
    excerpt:
      'A practical guide to structuring large React applications using feature folders, custom hooks, and composable components — based on lessons learned from production codebases.',
    category: 'React',
    tags: ['React', 'Architecture', 'Best Practices'],
    readTime: 8,
    date: '2025-09-12',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701767353_929b6330.jpg',
    content: `## Introduction

When I joined Tech Solutions Ltd, I inherited a React codebase serving more than 1,000 daily active users. Within six months, performance was lagging and adding features was painful. Here's the framework I used to turn things around.

## Organize by Feature, Not by Type

A common anti-pattern is grouping files like \`components/\`, \`reducers/\`, and \`utils/\` at the top level. Instead, group by **feature**:

\`\`\`
src/
  features/
    auth/
      components/
      hooks/
      api.ts
    dashboard/
\`\`\`

This makes each feature self-contained and easy to delete or extract.

## Extract Logic into Custom Hooks

Whenever a component grows past ~100 lines, look for hooks to extract. For example:

\`\`\`js
function useDebouncedSearch(query, delay = 300) {
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), delay);
    return () => clearTimeout(id);
  }, [query, delay]);
  return debounced;
}
\`\`\`

## Memoize Wisely

\`React.memo\`, \`useMemo\` and \`useCallback\` are powerful but easy to misuse. Reach for them only when:

- The component re-renders frequently
- The props are stable references
- Profiling shows a real bottleneck

## Server State vs UI State

Use **React Query** for server state and **useState/useReducer** for UI state. Mixing them in Redux often causes pain.

## Conclusion

These patterns helped us improve performance by **30%** during our legacy migration. Start small — pick one pattern and apply it consistently before moving to the next.`,
  },
  {
    slug: 'rest-api-design-with-express',
    title: 'REST API Design with Express.js: A Pragmatic Approach',
    excerpt:
      'How to design clean, predictable REST APIs in Node.js and Express. Covers routing structure, error handling, validation, and authentication middleware.',
    category: 'Node.js',
    tags: ['Node.js', 'Express', 'API'],
    readTime: 10,
    date: '2025-08-21',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701804990_867b51e0.png',
    content: `## Why API Design Matters

A clean API is the contract between your back-end and every client. Poor design slows down product velocity for years. Here's the structure I use.

## Project Layout

\`\`\`
src/
  routes/
  controllers/
  services/
  models/
  middleware/
\`\`\`

Routes only handle HTTP. Controllers orchestrate. Services hold business logic. Models talk to the DB.

## Predictable URLs

Stick to nouns and standard verbs:

- \`GET /api/events\` — list
- \`POST /api/events\` — create
- \`GET /api/events/:id\` — read
- \`PATCH /api/events/:id\` — update
- \`DELETE /api/events/:id\` — remove

## Centralized Error Handling

\`\`\`js
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: { message: err.message, code: err.code }
  });
});
\`\`\`

## Validation at the Edge

I use \`zod\` to validate every request body. Never trust client input — even from your own front-end.

## Conclusion

Good API design is mostly about consistency. Pick conventions, document them, and enforce them with linters and tests.`,
  },
  {
    slug: 'mongodb-schema-design',
    title: 'MongoDB Schema Design for Real Applications',
    excerpt:
      'When to embed and when to reference. A walk-through of schema decisions from my BeautyWorks and EventsManager projects, with real data shapes.',
    category: 'Databases',
    tags: ['MongoDB', 'Databases', 'Backend'],
    readTime: 7,
    date: '2025-07-30',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701822409_56b338b0.jpg',
    content: `## Embed or Reference?

The biggest question in MongoDB schema design is whether to embed a sub-document or store a reference.

**Embed when:**
- The data is owned by the parent
- It is read together most of the time
- It does not grow unbounded

**Reference when:**
- The data is shared
- It changes independently
- It can grow large

## Example: BeautyWorks Appointments

\`\`\`js
// Embedded: service snapshot at booking time
{
  _id: ObjectId,
  userId: ObjectId,
  service: { name: "Manicure", price: 1500 },
  date: ISODate,
  status: "confirmed"
}
\`\`\`

We snapshot the service so price changes don't rewrite history.

## Indexing

Always index the fields you query and sort on. Compound indexes follow the **ESR** rule: Equality, Sort, Range.

## Conclusion

Model your data around access patterns, not the shape of your domain. Profile real queries and adjust.`,
  },
  {
    slug: 'dockerizing-a-mern-app',
    title: 'Dockerizing a MERN Stack App from Scratch',
    excerpt:
      'A step-by-step tutorial on containerizing a MongoDB + Express + React + Node.js app for consistent local development and production deployment.',
    category: 'DevOps',
    tags: ['Docker', 'DevOps', 'MERN'],
    readTime: 12,
    date: '2025-06-18',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701848047_2a9c58cf.png',
    content: `## Why Docker?

Docker eliminates "works on my machine" issues. I containerize every project so onboarding takes minutes, not hours.

## Backend Dockerfile

\`\`\`
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["node", "src/index.js"]
\`\`\`

## Multi-stage React Build

\`\`\`
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
\`\`\`

## docker-compose.yml

Compose ties Mongo, the API, and the front-end together so the whole stack starts with one command.

## Conclusion

Once you have a working Compose file, deployment to any cloud is a matter of \`docker build\` and \`docker push\`. Highly recommended.`,
  },
  {
    slug: 'jwt-authentication-deep-dive',
    title: 'JWT Authentication: A Practical Deep Dive',
    excerpt:
      'Everything I learned implementing secure JWT-based authentication, from token storage to refresh flows and common pitfalls to avoid.',
    category: 'Security',
    tags: ['Security', 'JWT', 'Auth'],
    readTime: 9,
    date: '2025-05-05',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701876902_fb4119df.png',
    content: `## What is a JWT?

A JSON Web Token is a signed string that carries a JSON payload. The server can verify it without hitting a database.

## Where to Store Tokens

- **localStorage** — easy but vulnerable to XSS
- **httpOnly cookies** — safer, but require CSRF protection
- **In-memory** — safest but lost on refresh

I default to **httpOnly cookies for refresh tokens** and **in-memory access tokens**.

## Refresh Flow

1. User logs in → server sets refresh cookie + returns access token
2. Access token expires after 15 minutes
3. Client silently calls \`/refresh\` → gets a new access token

## Common Mistakes

- Storing access tokens forever
- Not rotating refresh tokens
- Using weak signing keys
- Skipping CSRF for cookie-based auth

## Conclusion

Auth is one place you should follow a battle-tested pattern. Reinventing it almost always ends badly.`,
  },
  {
    slug: 'testing-react-with-jest',
    title: 'Testing React Components with Jest and Testing Library',
    excerpt:
      'A pragmatic introduction to writing tests that actually catch bugs. Covers component testing, mocking APIs, and integration tests.',
    category: 'Testing',
    tags: ['Jest', 'Testing', 'React'],
    readTime: 6,
    date: '2025-04-12',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701897838_db6cd43f.png',
    content: `## Test Like a User

The mantra of React Testing Library is "the more your tests resemble the way your software is used, the more confidence they can give you." Lean into it.

## A Simple Component Test

\`\`\`js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments on click', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText('1')).toBeInTheDocument();
});
\`\`\`

## Mock the Network, Not Your Code

Use \`msw\` to intercept fetch calls. Don't mock React Query or hooks directly — it produces brittle tests.

## Conclusion

Write tests for the **behavior** users care about. Skip the implementation details. Your future self will thank you.`,
  },
  {
    slug: 'ci-cd-for-small-teams',
    title: 'CI/CD for Small Teams Using GitHub Actions',
    excerpt:
      'A starter workflow that runs your tests, builds your Docker image, and deploys on every merge — without needing a dedicated platform team.',
    category: 'DevOps',
    tags: ['CI/CD', 'GitHub Actions', 'DevOps'],
    readTime: 8,
    date: '2025-03-02',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701941162_b8803c4a.png',
    content: `## You Don't Need Jenkins

For small teams, GitHub Actions is more than enough. Here's the workflow I use as a starting point.

## Sample Workflow

\`\`\`yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --ci
      - run: npm run build
\`\`\`

## Deploy on Merge

Add a second job that runs only on \`main\`, builds a Docker image, pushes it to a registry, and triggers your server to pull the new image.

## Tips

- Cache your dependencies
- Run lint and test in parallel
- Fail fast — don't deploy broken builds
- Keep secrets in GitHub Secrets, never in YAML

## Conclusion

A good CI/CD pipeline is invisible. It just keeps your team moving forward and your production stable.`,
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) => {
  const post = getPost(slug);
  if (!post) return [];
  return blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => post.tags.includes(t)).length;
      const sameCategory = p.category === post.category ? 1 : 0;
      return { post: p, score: sharedTags * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
};
