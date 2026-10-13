"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Clock, Eye, Leaf, Link as LinkIcon, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';
import { fetchArticle, fetchArticles, staticArticles, type Article } from '@/lib/blogPosts';

// ── Article page ──────────────────────────────────────────
// Breadcrumb → category, title, intro and meta → feature image → article body,
// with a sidebar (share, author, related articles, categories).
// Colours follow the rest of the site: deep green #023b2c / #0a2820, orange #e87a2c.

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

const shareButton = "w-9 h-9 rounded-full text-white flex items-center justify-center hover:opacity-90 hover:-translate-y-0.5 transition-all";

const BlogDetail = () => {
  const { slug } = useParams();

  // The article and the list around it (related / previous / next) from arogya-admin →
  // Blog & Insights; the website's built-in articles are used if the backend cannot be reached.
  const [blog, setBlog] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([fetchArticle(String(slug)), fetchArticles()]).then(([article, list]) => {
      if (cancelled) return;
      const all = list ?? staticArticles;
      setArticles(all);
      setBlog(article === undefined ? all.find((b) => b.slug === slug) ?? null : article);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#023b2c]"></div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center py-24 text-center bg-[#fcfcfc] font-inter">
          <span className="text-5xl font-bold text-[#023b2c]/20 mb-2">404</span>
          <h1 className="text-2xl font-bold text-[#0a2820] mb-3">Article Not Found</h1>
          <p className="text-gray-600 mb-6 max-w-sm">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-[#023b2c] text-white text-sm font-semibold rounded-lg hover:bg-[#e87a2c] transition-colors duration-300">
            <ArrowLeft size={14} /> Back to Blogs
          </Link>
        </div>
      </Layout>
    );
  }

  // Related: same category first, then the newest of the rest
  const others = articles.filter((a) => a.slug !== blog.slug);
  const related = [...others.filter((a) => a.category === blog.category), ...others.filter((a) => a.category !== blog.category)].slice(0, 4);
  const index = articles.findIndex((a) => a.slug === blog.slug);
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index !== -1 && index < articles.length - 1 ? articles[index + 1] : null;
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const share = (target: string) => window.open(target, '_blank', 'noopener,noreferrer,width=640,height=560');
  const shareUrl = encodeURIComponent(pageUrl);
  const shareText = encodeURIComponent(blog.title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available (e.g. plain http on a phone): nothing to copy to
    }
  };

  return (
    <Layout>
      {/* Typography of the article body (the HTML written in the admin's editor) */}
      <style>{`
        .blog-article-content { color: #1f2937; font-size: 16px; line-height: 1.8; }
        .blog-article-content p { margin: 0 0 1.15em; }
        .blog-article-content h2 { font-size: 24px; line-height: 1.3; font-weight: 700; color: #0a2820; margin: 1.6em 0 0.6em; }
        .blog-article-content h3 { font-size: 20px; line-height: 1.35; font-weight: 700; color: #023b2c; margin: 1.5em 0 0.5em; }
        .blog-article-content h4 { font-size: 17px; font-weight: 700; color: #023b2c; margin: 1.3em 0 0.4em; }
        .blog-article-content ul, .blog-article-content ol { margin: 0 0 1.15em; padding-left: 1.4em; }
        .blog-article-content ul { list-style: disc; }
        .blog-article-content ol { list-style: decimal; }
        .blog-article-content li { margin-bottom: 0.4em; }
        .blog-article-content li::marker { color: #e87a2c; }
        .blog-article-content a { color: #023b2c; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .blog-article-content a:hover { color: #e87a2c; }
        .blog-article-content strong, .blog-article-content b { color: #0a2820; font-weight: 700; }
        .blog-article-content blockquote { margin: 1.4em 0; padding: 12px 18px; background: #f4f8f5; border-left: 3px solid #e87a2c; border-radius: 0 8px 8px 0; font-style: italic; color: #0a2820; }
        .blog-article-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 1.2em 0; }
        .blog-article-content hr { border: 0; border-top: 1px solid #e5e7eb; margin: 2em 0; }
      `}</style>

      <div className="bg-[#fcfcfc] font-inter">
        <SectionContainer className="pt-6 pb-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-500 mb-5">
            <Link href="/" className="hover:text-[#023b2c] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/blogs" className="hover:text-[#023b2c] transition-colors">Blogs</Link>
            {blog.category && (
              <>
                <ChevronRight size={14} className="text-gray-400" />
                <span className="font-medium text-[#023b2c]">{blog.category}</span>
              </>
            )}
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-700 line-clamp-1">{blog.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-10">
            {/* Article */}
            <main className="min-w-0">
              {blog.category && (
                <span className="inline-block bg-[#023b2c] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4">
                  {blog.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-[#0a2820] leading-tight mb-4">{blog.title}</h1>
              {blog.excerpt && <p className="text-gray-700 text-base md:text-[17px] leading-relaxed mb-5">{blog.excerpt}</p>}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 pb-5 mb-6 border-b border-gray-200">
                {blog.date && <span className="flex items-center gap-2"><Calendar size={16} className="text-[#e87a2c]" /> {blog.date}</span>}
                {blog.readTime && <span className="flex items-center gap-2"><Clock size={16} className="text-[#e87a2c]" /> {blog.readTime}</span>}
                <span className="flex items-center gap-2"><Eye size={16} className="text-[#e87a2c]" /> {blog.views.toLocaleString('en-IN')} Views</span>
              </div>

              {blog.image && (
                <div className="rounded-2xl overflow-hidden mb-8" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                  <img src={blog.image} alt={blog.imageAlt || blog.title} className="w-full max-h-[520px] object-cover" />
                </div>
              )}

              <div className="blog-article-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-gray-500 mr-1">Tags:</span>
                  {blog.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-[#f4f8f5] border border-[#dce8df] text-[12px] font-semibold text-[#023b2c]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Previous / next article */}
              {(prev || next) && (
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {prev ? (
                    <Link href={`/blogs/${prev.slug}`} className="group flex flex-col gap-1.5 p-5 bg-white rounded-xl border border-gray-200 hover:border-[#023b2c]/40 hover:shadow-md transition-all">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500"><ArrowLeft size={13} /> Previous Article</span>
                      <span className="text-sm font-bold text-[#0a2820] group-hover:text-[#023b2c] line-clamp-2">{prev.title}</span>
                    </Link>
                  ) : <span />}
                  {next && (
                    <Link href={`/blogs/${next.slug}`} className="group flex flex-col gap-1.5 p-5 bg-white rounded-xl border border-gray-200 hover:border-[#e87a2c]/50 hover:shadow-md transition-all text-right">
                      <span className="flex items-center justify-end gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">Next Article <ArrowRight size={13} /></span>
                      <span className="text-sm font-bold text-[#0a2820] group-hover:text-[#e87a2c] line-clamp-2">{next.title}</span>
                    </Link>
                  )}
                </div>
              )}

              <Link href="/blogs" className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-[#023b2c] hover:text-[#e87a2c] transition-colors">
                <ArrowLeft size={15} /> Back to all articles
              </Link>
            </main>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Share */}
              <div>
                <h3 className="text-sm font-bold text-[#0a2820] mb-3 tracking-wide">Share this article</h3>
                <div className="flex items-center gap-2.5">
                  <button onClick={() => share(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)} aria-label="Share on Facebook" className={`${shareButton} bg-[#3b5998]`}><FacebookIcon /></button>
                  <button onClick={() => share(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`)} aria-label="Share on X" className={`${shareButton} bg-black`}><XIcon /></button>
                  <button onClick={() => share(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)} aria-label="Share on LinkedIn" className={`${shareButton} bg-[#0077b5]`}><LinkedinIcon /></button>
                  <button onClick={() => share(`https://wa.me/?text=${shareText}%20${shareUrl}`)} aria-label="Share on WhatsApp" className={`${shareButton} bg-[#25D366]`}><MessageCircle className="w-4 h-4" /></button>
                  <button onClick={copyLink} aria-label="Copy link" title={copied ? 'Link copied' : 'Copy link'} className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    {copied ? <Check className="w-4 h-4 text-[#023b2c]" /> : <LinkIcon className="w-4 h-4" />}
                  </button>
                </div>
                {copied && <p className="text-[12px] font-medium text-[#023b2c] mt-2">Link copied to clipboard.</p>}
              </div>

              {/* Author */}
              <section className="bg-[#f4f8f5] rounded-2xl p-6 text-center border border-[#dce8df]">
                <h3 className="text-[13px] font-bold text-[#0a2820] mb-4 uppercase tracking-wider">About the Author</h3>
                <div className="w-14 h-14 rounded-full bg-white border border-[#dce8df] flex items-center justify-center mx-auto mb-3 shadow-sm" aria-hidden="true">
                  <Leaf className="w-6 h-6 text-[#023b2c] fill-[#023b2c]" />
                </div>
                <div className="font-bold text-[#023b2c] text-[15px]">{blog.author || 'Arogya Sangoshthi Team'}</div>
                {blog.authorRole && <div className="text-[12px] font-semibold text-[#e87a2c] mt-0.5">{blog.authorRole}</div>}
                <p className="text-[13px] text-gray-600 leading-relaxed mt-2.5 px-1">
                  Sharing insights on integrated healthcare, AYUSH and wellness with the Arogya Sangoshthi community.
                </p>
              </section>

              {/* Related Articles */}
              {related.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-[#023b2c] mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map((article) => (
                      <Link key={article.slug} href={`/blogs/${article.slug}`} className="flex gap-3 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          {article.image && <img src={article.image} alt={article.imageAlt || article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[13.5px] font-bold text-gray-800 leading-snug group-hover:text-[#e87a2c] transition-colors mb-1.5 line-clamp-2">{article.title}</h4>
                          <div className="text-[12px] text-gray-500">{article.date}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-[#023b2c] mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className={`px-3 py-1.5 text-[12px] font-semibold rounded-full border ${category === blog.category
                          ? 'bg-[#023b2c] text-white border-[#023b2c]'
                          : 'bg-white text-gray-600 border-gray-200'
                          }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </SectionContainer>
      </div>
    </Layout>
  );
};

export default BlogDetail;
