"use client";
import Link from 'next/link';
import { ArrowRight, Clock, User, BookOpen, ChevronRight } from 'lucide-react';
import blogsData from '@/data/blogsData';

const catStyle = {
  Research:   { pill: 'bg-orange-100 text-orange-600',   bar: '#f97316' },
  AYUSH:      { pill: 'bg-emerald-100 text-emerald-700', bar: '#10b981' },
  Wellness:   { pill: 'bg-sky-100 text-sky-700',         bar: '#0ea5e9' },
  Conference: { pill: 'bg-violet-100 text-violet-700',   bar: '#8b5cf6' },
};

const BlogCard = ({ blog }) => {
  const c = catStyle[blog.category] || catStyle.Research;
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 w-full"
      style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.07), 0 4px 14px rgba(0,0,0,0.05)' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.07), 0 4px 14px rgba(0,0,0,0.05)'}
    >
      {/* Top color bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${c.bar}, ${c.bar}88)` }} />

      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={blog.image?.src || blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Category pill */}
        <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${c.pill}`}>
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 py-3 gap-2">
        {/* Date + read time */}
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span>{blog.date}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
          <Clock size={9} />
          <span>{blog.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[13px] text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2 flex-1">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
              <User size={10} className="text-slate-500" />
            </div>
            <span className="text-[10px] font-semibold text-slate-600 truncate max-w-[100px]">{blog.author}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 group-hover:text-orange-500 transition-colors">
            Read More <ChevronRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
};

const HomeBlogsSection = () => {
  const featured = blogsData.slice(0, 3);

  return (
    <section className="py-16 bg-slate-50 relative overflow-x-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 mb-4 border-l-4 border-orange-600">
            <BookOpen size={12} className="text-orange-700" />
            <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">Latest Insights</span>
          </div>

          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1.5">
                From Our <span className="text-emerald-700">Blog</span>
              </h2>
              <p className="text-muted-foreground text-[13px] max-w-xl leading-relaxed">
                Expert perspectives and research insights from the world of integrative medicine.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-orange-600 transition-colors group"
            >
              View All Articles
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Cards — tight 3-col grid */}
        <div className="grid md:grid-cols-3 gap-3">
          {featured.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeBlogsSection;

