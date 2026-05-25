import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

const allCategories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const Blog: React.FC = () => {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const list = category === 'All' ? blogPosts : blogPosts.filter((p) => p.category === category);
    return [...list].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [category]);

  return (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-cyan-600 font-semibold tracking-widest text-sm uppercase mb-3">Articles & Tutorials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1020] mb-4">
              From the Blog
            </h2>
            <p className="text-slate-600 max-w-2xl">
              Lessons, tutorials, and deep-dives from my work building production full-stack
              applications.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === c
                    ? 'bg-[#0b1020] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-400 hover:text-cyan-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cyan-500 text-white text-xs font-semibold">
                  {p.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(p.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.readTime} min read</span>
                </div>
                <h3 className="text-lg font-bold text-[#0b1020] mb-2 group-hover:text-cyan-600 transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {p.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-cyan-600 group-hover:text-orange-500 transition-colors">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
