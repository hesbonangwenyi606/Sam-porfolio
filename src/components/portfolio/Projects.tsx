import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, Search } from 'lucide-react';

const projects = [
  {
    title: 'BeautyWorks',
    desc: 'A full-featured beauty service booking platform with user authentication, role-based access, service catalog, and appointment booking system.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS'],
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701431320_164f47b6.jpg',
    category: 'Full Stack',
  },
  {
    title: 'Expense-Track',
    desc: 'Personal and small business expense tracking app with dashboards, CRUD operations, and integrated summary analytics for budget management.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701431546_e3449960.jpg',
    category: 'Analytics',
  },
  {
    title: 'EventsManager',
    desc: 'Event management and RSVP system featuring event creation, RSVP tracking, and email notifications with real-time updates.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Email API'],
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701439329_a2fbd345.png',
    category: 'Full Stack',
  },
  {
    title: 'MovieApp',
    desc: 'Interactive movie database and review platform integrating the TMDB API with review, rating, search and filter functionality.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'TMDB API'],
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701436783_85f6b882.png',
    category: 'API Integration',
  },
  {
    title: 'QuizApp',
    desc: 'Educational quiz platform with quiz creation, scoring logic, leaderboards, and secure user sessions.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701435172_74f167c6.jpg',
    category: 'Education',
  },
];

const filters = ['All', 'Full Stack', 'Analytics', 'API Integration', 'Education'];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = filter === 'All' || p.category === filter;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="projects" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-cyan-600 font-semibold tracking-widest text-sm uppercase mb-3">Featured Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1020] mb-4">
            Projects I've Built
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A selection of full-stack applications delivered from concept to deployment.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10 items-stretch lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-[#0b1020] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-400 hover:text-cyan-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none text-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No projects match your search.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <article
                key={i}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-[#0b1020]">
                    {p.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0b1020] mb-2 group-hover:text-cyan-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/samuel-m765"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                    <a
                      href="https://github.com/samuel-m765"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
