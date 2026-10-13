import { API_URL } from '@/lib/api';
import blogsData from '@/data/blogsData';

// Blog posts written in arogya-admin → Blog & Insights (backend-arogya, GET /api/blogs),
// in the shape the Blogs page and the article page render.

export interface Article {
  id: string;
  slug: string;
  category: string;
  tag: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  tags: string[];
  views: number;
  /** Shown in the "Featured Story" slider at the top of the Blogs page */
  featured: boolean;
}

const formatDate = (value?: string) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
};

const toArticle = (post: any): Article => ({
  id: String(post._id),
  slug: post.slug,
  category: post.category || '',
  tag: (Array.isArray(post.tags) && post.tags[0]) || post.category || '',
  title: post.h1Title || post.title,
  excerpt: post.excerpt || '',
  content: post.content || '',
  author: post.author || '',
  authorRole: post.authorRole || '',
  date: formatDate(post.publishDate || post.createdAt),
  readTime: post.readTime || '',
  image: post.image || '',
  imageAlt: post.imageAlt || post.title,
  tags: Array.isArray(post.tags) ? post.tags : [],
  views: Number(post.views) || 0,
  featured: Boolean(post.featured),
});

/** The articles built into the website — used only when the backend cannot be reached */
export const staticArticles: Article[] = (blogsData as any[]).map((blog) => ({
  id: String(blog.id),
  slug: blog.slug,
  category: blog.category,
  tag: blog.tag || blog.category,
  title: blog.title,
  excerpt: blog.excerpt,
  content: blog.content,
  author: blog.author,
  authorRole: blog.authorRole || '',
  date: blog.date,
  readTime: blog.readTime,
  image: blog.image?.src || blog.image,
  imageAlt: blog.title,
  tags: [blog.tag].filter(Boolean),
  views: 0,
  featured: false,
}));

/** Live posts, newest first. `null` when the backend cannot be reached. */
export const fetchArticles = async (): Promise<Article[] | null> => {
  try {
    const response = await fetch(`${API_URL}/blogs?limit=100`);
    const data = await response.json();
    return data.success ? (data.data.posts || []).map(toArticle) : null;
  } catch {
    console.warn('Error fetching blog posts');
    return null;
  }
};

/** One article by its slug: the article, `null` when it does not exist (or is not live),
 * `undefined` when the backend cannot be reached. */
export const fetchArticle = async (slug: string): Promise<Article | null | undefined> => {
  try {
    const response = await fetch(`${API_URL}/blogs/${encodeURIComponent(slug)}`);
    if (response.status === 404) return null;
    const data = await response.json();
    return data.success ? toArticle(data.data) : undefined;
  } catch {
    console.warn('Error fetching blog post');
    return undefined;
  }
};

export interface ArticleCategories {
  /** Live posts in all categories together */
  total: number;
  categories: { name: string; slug: string; count: number }[];
}

/** Published blog categories with their live post counts (arogya-admin → Manage Categories).
 * `null` when the backend cannot be reached. */
export const fetchArticleCategories = async (): Promise<ArticleCategories | null> => {
  try {
    const response = await fetch(`${API_URL}/blogs/categories`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch {
    console.warn('Error fetching blog categories');
    return null;
  }
};
