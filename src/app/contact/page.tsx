import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import ContactHero from '@/components/contact/ContactHero';
import DynamicSeoHead from '@/components/DynamicSeoHead';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { fetchCmsSeoForPage, resolveOgImageUrl } from '@/lib/fetchCmsSeo';

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/contact');
  const ogImg = cms?.ogImage ? resolveOgImageUrl(cms.ogImage) : `${SITE_URL}/ogimage.webp`;
  return {
    title: cms?.metaTitle || 'Contact Us',
    description: cms?.metaDescription ||
      'Get in touch with Arogya Sangoshthi 2026. Pragati Maidan, New Delhi.',
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: { url: `${SITE_URL}/contact`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Arogya Sangoshthi 2026 — for delegate registration, speaker inquiries, exhibition bookings, and general information. Pragati Maidan, New Delhi.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact | Arogya Sangoshthi 2026",
    description:
      "Reach out to the Arogya Sangoshthi Foundation for registrations, speaker slots, and partnership opportunities.",
    url: `${SITE_URL}/contact`,
  },
};

// Lazy loading the below-the-fold components
const ContactForm = dynamic(() => import('@/components/contact/ContactForm'));
const ContactBottom = dynamic(() => import('@/components/contact/ContactBottom'));



export default function ContactPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/contact" />
      <ServerSeoSchema pagePath="/contact" />
      <div className="bg-[#fbfcf7] min-h-screen">
        <ContactHero />
        <ContactForm />
        <ContactBottom />
      </div>
    </Layout>
  );
}
