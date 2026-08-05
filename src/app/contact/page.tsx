import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import ContactHero from '@/components/contact/ContactHero';
import DynamicSeoHead from '@/components/DynamicSeoHead';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { fetchCmsSeoForPage, getOgImageUrl } from '@/lib/fetchCmsSeo';

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/contact');
  const ogImg = getOgImageUrl(cms);
  return {
    title: cms?.metaTitle || 'Contact Us',
    description: cms?.metaDescription ||
      'Get in touch with Arogya Sangoshthi 2026. Pragati Maidan, New Delhi.',
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: { url: `${SITE_URL}/contact`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}




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
