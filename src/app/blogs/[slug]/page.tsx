"use client";
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useParams, } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, User, Tag, Calendar, Share2 } from 'lucide-react';
import blogsData from '@/data/blogsData';

// ── Palette ───────────────────────────────────────────────
// Deep emerald  #0B4F3F   ink            #1C2622
// Saffron       #C2742F   parchment      #FAF6EE
// Hairline      #E4DDCC
const categoryColors = {
  Research:   { bg: 'bg-[#FBEFE3]', text: 'text-[#9C5420]', border: 'border-[#E9CFAE]', dot: 'bg-[#C2742F]' },
  AYUSH:      { bg: 'bg-[#E9F3EC]', text: 'text-[#0B4F3F]', border: 'border-[#CFE3D6]', dot: 'bg-[#0B4F3F]' },
  Wellness:   { bg: 'bg-[#EAF0F6]', text: 'text-[#2C5777]', border: 'border-[#D2E0EB]', dot: 'bg-[#2C5777]' },
  Conference: { bg: 'bg-[#F1ECF6]', text: 'text-[#5B3E84]', border: 'border-[#DCD0EA]', dot: 'bg-[#5B3E84]' },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = blogsData.find(b => b.slug === slug);

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center py-24 text-center bg-[#FAF6EE]">
          <span className="font-playfair text-5xl text-[#0B4F3F]/20 mb-2">404</span>
          <h2 className="text-2xl font-bold text-[#1C2622] mb-3 font-playfair">Article Not Found</h2>
          <p className="text-[#5B6660] mb-6 max-w-sm">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B4F3F] text-white text-sm font-semibold tracking-wide hover:bg-[#C2742F] transition-colors duration-300">
            <ArrowLeft size={14} /> Back to Blogs
          </Link>
        </div>
      </Layout>
    );
  }

  const colors = categoryColors[blog.category] || categoryColors.Research;
  const related = blogsData.filter(b => b.id !== blog.id && b.category === blog.category).slice(0, 3);
  const currentIdx = blogsData.findIndex(b => b.id === blog.id);
  const prev = currentIdx > 0 ? blogsData[currentIdx - 1] : null;
  const next = currentIdx < blogsData.length - 1 ? blogsData[currentIdx + 1] : null;

  return (
    <Layout>
      <div className="bg-[#FAF6EE]">

        {/* ── Hero ─────────────────────────────────────── */}
        <div className="relative h-[60vh] min-h-[420px] max-h-[620px] overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0C]/90 via-[#0B0F0C]/40 to-[#0B0F0C]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F0C]/30 via-transparent to-transparent" />

          {/* breadcrumb */}
          <div className="absolute top-0 left-0 right-0 pt-7">
            <div className="container mx-auto px-4 md:px-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-[12px] font-medium text-white/80 hover:text-white transition-colors group">
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="tracking-wide">All Articles</span>
              </Link>
            </div>
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-14">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] border backdrop-blur-sm ${colors.bg}/90 ${colors.text} ${colors.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {blog.category}
                  </span>
                  <span className="text-[11px] text-white/60 font-medium tracking-wide">Arogya Sangoshthi 2025</span>
                </div>
                <h1 className="font-playfair text-3xl md:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────── */}
        <div className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 max-w-6xl mx-auto">

              {/* Article column */}
              <div>
                {/* Meta strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-7 border-b border-[#E4DDCC]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#0B4F3F] flex items-center justify-center text-white font-playfair font-semibold text-sm flex-shrink-0">
                      {blog.author?.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <p className="text-[13.5px] font-bold text-[#1C2622] leading-tight">{blog.author}</p>
                      <p className="text-[11.5px] text-[#5B6660]">{blog.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-[12px] text-[#5B6660]">
                    <span className="flex items-center gap-1.5"><Calendar size={13} className="text-[#C2742F]" /> {blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#C9C1AC]" />
                    <span className="flex items-center gap-1.5"><Clock size={13} className="text-[#C2742F]" /> {blog.readTime}</span>
                  </div>
                </div>

                {/* Article content — drop-cap first paragraph */}
                <div
                  className="prose prose-slate max-w-none font-playfair
                    prose-headings:font-playfair prose-headings:text-[#1C2622] prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-[#E4DDCC]
                    prose-h3:text-xl prose-h3:mt-9 prose-h3:mb-3 prose-h3:text-[#0B4F3F]
                    prose-p:text-[16px] prose-p:leading-[1.85] prose-p:text-[#3A413C]
                    prose-strong:text-[#1C2622]
                    prose-a:text-[#0B4F3F] prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-[3px] prose-blockquote:border-[#C2742F] prose-blockquote:bg-[#F4EFE2] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-[#1C2622] prose-blockquote:font-medium
                    prose-li:text-[#3A413C] prose-li:leading-relaxed
                    prose-img:shadow-sm
                    first-letter:font-playfair first-letter:text-6xl first-letter:font-bold first-letter:text-[#0B4F3F] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85]"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags + share */}
                <div className="mt-12 pt-7 border-t border-[#E4DDCC] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={13} className="text-[#5B6660]" />
                    <span className={`px-3 py-1.5 text-[11px] font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {blog.tag}
                    </span>
                    <span className={`px-3 py-1.5 text-[11px] font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {blog.category}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#5B6660] hover:text-[#0B4F3F] transition-colors">
                    <Share2 size={14} /> Share Article
                  </button>
                </div>

                {/* Prev / Next */}
                <div className="grid sm:grid-cols-2 gap-px mt-10 bg-[#E4DDCC] border border-[#E4DDCC]">
                  {prev ? (
                    <Link href={`/blogs/${prev.slug}`} className="group flex flex-col gap-2 p-5 bg-white hover:bg-[#FAF6EE] transition-colors">
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#9CA39D] font-bold">
                        <ArrowLeft size={11} /> Previous
                      </span>
                      <p className="text-[14px] font-bold text-[#1C2622] group-hover:text-[#0B4F3F] transition-colors line-clamp-2 font-playfair">{prev.title}</p>
                    </Link>
                  ) : <div className="bg-white" />}
                  {next ? (
                    <Link href={`/blogs/${next.slug}`} className="group flex flex-col gap-2 p-5 bg-white text-right hover:bg-[#FAF6EE] transition-colors">
                      <span className="flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#9CA39D] font-bold">
                        Next <ArrowRight size={11} />
                      </span>
                      <p className="text-[14px] font-bold text-[#1C2622] group-hover:text-[#C2742F] transition-colors line-clamp-2 font-playfair">{next.title}</p>
                    </Link>
                  ) : <div className="bg-white" />}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-5 lg:sticky lg:top-6 self-start">
                {/* Author card */}
                <div className="bg-white border border-[#E4DDCC] p-6">
                  <div className="w-14 h-14 rounded-full bg-[#0B4F3F] flex items-center justify-center text-white font-playfair font-semibold text-lg mb-4">
                    {blog.author?.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <p className="font-bold text-[15px] text-[#1C2622] font-playfair mb-0.5">{blog.author}</p>
                  <p className="text-[11.5px] text-[#C2742F] font-semibold mb-3 uppercase tracking-wide">{blog.authorRole}</p>
                  <p className="text-[12.5px] text-[#5B6660] leading-relaxed">
                    Distinguished medical professional and contributor to the Arogya Sangoshthi 2025 conference.
                  </p>
                </div>

                {/* Related Articles */}
                {related.length > 0 && (
                  <div className="bg-white border border-[#E4DDCC] p-6">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#1C2622] mb-5 pb-4 border-b border-[#E4DDCC] font-playfair">
                      Related Articles
                    </h3>
                    <div className="space-y-5">
                      {related.map(r => (
                        <Link key={r.id} href={`/blogs/${r.slug}`} className="group flex gap-3">
                          <div className="w-16 h-14 flex-shrink-0 overflow-hidden bg-[#F4EFE2]">
                            <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12.5px] font-semibold text-[#1C2622] group-hover:text-[#0B4F3F] transition-colors line-clamp-2 leading-snug">{r.title}</p>
                            <p className="text-[10.5px] text-[#9CA39D] mt-1.5">{r.date}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="relative p-7 text-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #0B4F3F 0%, #073A2D 100%)' }}>
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/5" />
                  <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-white/5" />
                  <h4 className="relative text-white font-bold text-[15px] mb-2 font-playfair">Join Arogya Sangoshthi 2025</h4>
                  <p className="relative text-[#BFE0CE] text-[12px] mb-5 leading-relaxed">Be part of India's premier integrative medicine conference.</p>
                  <Link href="/register-now" className="relative inline-block px-6 py-2.5 bg-[#C2742F] text-white text-[11.5px] font-bold uppercase tracking-[0.08em] hover:bg-[#A85F22] transition-colors">
                    Register Now
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
