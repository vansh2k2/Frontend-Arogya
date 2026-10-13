import type { Metadata } from 'next';

// The article page itself is a client component, so its SEO lives here: meta title,
// description, keywords, canonical, Open Graph and the JSON-LD schema come from the post's
// SEO fields in arogya-admin → Blog & Insights.
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api').replace(/\/$/, '');
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://arogya.namogange.org').replace(/\/$/, '');

type Params = { params: Promise<{ slug: string }> };

const fetchPost = async (slug: string) => {
  try {
    // noview: reading the post for its meta tags is not a visit
    const response = await fetch(`${API_URL}/blogs/${encodeURIComponent(slug)}?noview=1`, { cache: 'no-store' });
    const data = await response.json();
    return data?.success ? data.data : null;
  } catch {
    return null;
  }
};

// Tags Next.js already writes from the fields below — the "Additional OG Tags" box adds the rest
const BUILT_IN_TAGS = ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];

/** <meta property|name="x" content="y"> pairs of the "Additional OG Tags" box → { x: y } */
const extraMetaTags = (html?: string): Record<string, string> => {
  const tags: Record<string, string> = {};
  for (const [tag] of (html || '').matchAll(/<meta\b[^>]*>/gi)) {
    const attr = (name: string) => {
      const m = tag.match(new RegExp(`(?:${name})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
      return (m?.[1] ?? m?.[2])?.trim();
    };
    const key = attr('property|name')?.toLowerCase();
    const value = attr('content');
    if (key && value && !BUILT_IN_TAGS.includes(key)) tags[key] = value.replace(/&amp;/g, '&');
  }
  return tags;
};

/** The "Schema Markup (JSON-LD)" box as valid JSON text, or null when it is empty / broken */
const schemaJson = (raw?: string): string | null => {
  if (!raw?.trim()) return null;
  try {
    // "<" is escaped so the text can never close the <script> tag it is written into
    return JSON.stringify(JSON.parse(raw)).replace(/</g, '\\u003c');
  } catch {
    return null;
  }
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: 'Blogs & News | Arogya Sangoshthi 2026' };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || '';
  const image = post.ogImage || post.image;
  // A canonical saved for the live domain or localhost still points at this article here
  const canonical = `${SITE_URL}/blogs/${post.slug}`;

  return {
    title,
    description,
    keywords: post.metaKeywords || undefined,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      url: canonical,
      images: image ? [{ url: image, alt: post.imageAlt || title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      images: image ? [image] : undefined,
    },
    other: extraMetaTags(post.openGraphTags),
  };
}

export default async function Layout({ children, params }: Params & { children: React.ReactNode }) {
  const { slug } = await params;
  const schema = schemaJson((await fetchPost(slug))?.schemaMarkup);
  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />}
      {children}
    </>
  );
}
