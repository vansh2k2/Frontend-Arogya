import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import ContactHero from '@/components/contact/ContactHero';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { buildPageMetadata } from '@/lib/fetchCmsSeo';


// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/contact', {
    title: 'Contact Us', description: 'Get in touch with Arogya Sangoshthi 2026. Pragati Maidan, New Delhi.',
  });
}




// Lazy loading the below-the-fold components
const ContactForm = dynamic(() => import('@/components/contact/ContactForm'));
const ContactBottom = dynamic(() => import('@/components/contact/ContactBottom'));



export default function ContactPage() {
  return (
    <Layout>
      <ServerSeoSchema pagePath="/contact" />
      <div className="bg-[#fbfcf7] min-h-screen">
        <ContactHero />
        <ContactForm />
        <ContactBottom />
      </div>
    </Layout>
  );
}
