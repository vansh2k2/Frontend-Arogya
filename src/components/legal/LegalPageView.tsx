import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/layout/SectionContainer';

// Privacy Policy, Terms & Conditions and Refund Policy — text edited in arogya-admin → Legal Pages
// (backend-arogya GET /api/legal-pages/:slug, cached 60 s).

export type LegalSlug = 'privacy' | 'terms' | 'refund';

export interface LegalPageData {
  title: string;
  effectiveDate: string;
  content: string;
}

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api').replace(/\/$/, '');

export const LEGAL_TITLES: Record<LegalSlug, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  refund: 'Refund Policy',
};

export const fetchLegalPage = async (slug: LegalSlug): Promise<LegalPageData | null> => {
  try {
    const res = await fetch(`${API_URL}/legal-pages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const body = await res.json();
    return body?.success ? body.data : null;
  } catch {
    return null;
  }
};

const OTHER_PAGES: { slug: LegalSlug; href: string }[] = [
  { slug: 'privacy', href: '/privacy' },
  { slug: 'terms', href: '/terms' },
  { slug: 'refund', href: '/refund' },
];

export default function LegalPageView({ slug, page }: { slug: LegalSlug; page: LegalPageData | null }) {
  const title = page?.title || LEGAL_TITLES[slug];

  return (
    <Layout>
      <style>{`
        .legal-content { color: #1f2937; font-size: 16px; line-height: 1.8; }
        .legal-content p { margin: 0 0 1.1em; }
        .legal-content h2 { font-size: 22px; line-height: 1.3; font-weight: 700; color: #0a2820; margin: 1.6em 0 0.6em; }
        .legal-content h3 { font-size: 18px; font-weight: 700; color: #023b2c; margin: 1.4em 0 0.5em; }
        .legal-content ul, .legal-content ol { margin: 0 0 1.1em; padding-left: 1.4em; }
        .legal-content ul { list-style: disc; }
        .legal-content ol { list-style: decimal; }
        .legal-content li { margin-bottom: 0.4em; }
        .legal-content li::marker { color: #e87a2c; }
        .legal-content a { color: #023b2c; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .legal-content a:hover { color: #e87a2c; }
        .legal-content strong { color: #0a2820; }
      `}</style>

      <div className="bg-[#fcfcfc] font-inter">
        <div className="bg-[#023b2c] text-white">
          <SectionContainer className="py-12 md:py-16">
            <nav aria-label="Breadcrumb" className="mb-3 text-[13px] text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-white">{title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            {page?.effectiveDate && <p className="mt-2 text-sm text-white/80">Effective date: {page.effectiveDate}</p>}
          </SectionContainer>
        </div>

        <SectionContainer className="py-10 md:py-14">
          <div className="mx-auto max-w-3xl">
            {page?.content ? (
              <div className="legal-content" dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <p className="text-gray-600">
                This page is being updated. For any question, please <Link href="/contact" className="font-semibold text-[#023b2c] underline">contact us</Link>.
              </p>
            )}

            <div className="mt-12 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
              {OTHER_PAGES.filter((p) => p.slug !== slug).map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="rounded-full border border-[#023b2c]/20 px-4 py-2 text-sm font-semibold text-[#023b2c] hover:bg-[#023b2c] hover:text-white transition-colors"
                >
                  {LEGAL_TITLES[p.slug]}
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    </Layout>
  );
}
