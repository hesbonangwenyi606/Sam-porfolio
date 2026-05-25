import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { marked } from 'marked';
import { ArrowLeft, Clock, Calendar, Tag, ChevronRight, ListTree, Share2, Check } from 'lucide-react';
import { blogPosts, getPost, getRelatedPosts } from '@/data/blogPosts';
import Navbar from '@/components/portfolio/Navbar';
import Footer from '@/components/portfolio/Footer';

type Heading = { id: string; text: string; level: number };

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  const [activeId, setActiveId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);
  const { html, headings } = useMemo(() => {
    if (!post) return { html: '', headings: [] as Heading[] };

    marked.setOptions({ gfm: true, breaks: false });
    const rawHtml = marked.parse(post.content) as string;

    const headings: Heading[] = [];
    // Inject IDs into headings and collect them for the TOC
    const htmlWithIds = rawHtml.replace(
      /<h([1-3])>([\s\S]*?)<\/h\1>/g,
      (_match, levelStr: string, inner: string) => {
        const level = Number(levelStr);
        const text = inner.replace(/<[^>]+>/g, '').trim();
        const id = slugify(text);
        headings.push({ id, text, level });
        return `<h${level} id="${id}">${inner}</h${level}>`;
      }
    );

    return { html: htmlWithIds, headings };
  }, [post]);

  useEffect(() => {
    if (!headings.length) return;
    const handler = () => {
      const offset = 140;
      let current = headings[0]?.id || '';
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = h.id;
      }
      setActiveId(current);
    };
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [headings]);

  if (!post) return <Navigate to="/" replace />;

  const related = getRelatedPosts(post.slug);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* ignore */
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Article hero */}
      <section className="relative pt-32 pb-12 bg-gradient-to-br from-[#0b1020] via-slate-900 to-[#0b1020] text-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400 transition flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#blog" className="hover:text-cyan-400 transition">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-300 truncate">{post.title}</span>
          </nav>

          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500 text-white text-xs font-semibold mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-3xl">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
            <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {post.tags.join(' · ')}</span>
            <button
              onClick={handleShare}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition text-slate-200"
            >
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Share2 className="w-4 h-4" /> Share</>}
            </button>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 mb-12 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
          <img src={post.image} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
        </div>
      </div>

      {/* Article body + TOC */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[#0b1020] prose-headings:scroll-mt-28
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#0b1020]
              prose-code:text-cyan-700 prose-code:bg-cyan-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-sm
              prose-pre:bg-[#0b1020] prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-5 prose-pre:overflow-x-auto prose-pre:shadow-lg
              prose-li:text-slate-700 prose-ul:my-4 prose-ol:my-4
              prose-blockquote:border-l-cyan-400 prose-blockquote:bg-cyan-50/40 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-slate-700"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 text-[#0b1020] font-semibold">
                  <ListTree className="w-4 h-4 text-cyan-600" />
                  <span>Table of Contents</span>
                </div>
                {headings.length === 0 ? (
                  <p className="text-sm text-slate-500">No sections.</p>
                ) : (
                  <ul className="space-y-1.5 text-sm">
                    {headings.map((h) => (
                      <li key={h.id} style={{ paddingLeft: (h.level - 2) * 12 }}>
                        <button
                          onClick={() => scrollToId(h.id)}
                          className={`text-left block w-full py-1 transition-colors border-l-2 pl-3 ${
                            activeId === h.id
                              ? 'border-cyan-500 text-cyan-700 font-semibold bg-white rounded-r-md'
                              : 'border-transparent text-slate-600 hover:text-cyan-600'
                          }`}
                        >
                          {h.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 pt-5 border-t border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 text-xs font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="text-cyan-600 font-semibold tracking-widest text-sm uppercase mb-2">Keep Reading</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1020]">Related Articles</h2>
              </div>
              <Link to="/#blog" className="text-cyan-600 font-semibold text-sm hover:text-orange-500 transition inline-flex items-center gap-1">
                All posts <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-40 overflow-hidden bg-slate-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs text-cyan-600 font-semibold mb-2">{p.category} · {p.readTime} min</div>
                    <h3 className="font-bold text-[#0b1020] group-hover:text-cyan-600 transition-colors leading-snug mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;

// Static helper export so router knows the available slugs at compile time
export const blogSlugs = blogPosts.map((p) => p.slug);
