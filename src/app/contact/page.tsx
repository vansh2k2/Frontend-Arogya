import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import ContactHero from '@/components/contact/ContactHero';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema, organizationSchema, SITE_URL } from '@/lib/schemas';
import DynamicSeoHead from '@/components/DynamicSeoHead';

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

const contactPageSchema = webPageSchema({
  type: "ContactPage",
  name: "Contact | Arogya Sangoshthi 2026",
  description:
    "Get in touch with the Arogya Sangoshthi Foundation for registrations, speaker slots, and partnership opportunities.",
  url: `${SITE_URL}/contact`,
});

// Richer organization schema with contact info for this page
const contactOrgSchema = {
  ...organizationSchema,
  "@context": "https://schema.org",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "delegate registration",
      url: `${SITE_URL}/delegate-registration`,
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "speaker inquiries",
      url: `${SITE_URL}/speakers`,
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "exhibition bookings",
      url: `${SITE_URL}/contact`,
      availableLanguage: ["en", "hi"],
    },
  ],
};

const contactBreadcrumb = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Contact", url: `${SITE_URL}/contact` },
]);

export default function ContactPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/contact" />
      <JsonLd data={[contactPageSchema, contactOrgSchema, contactBreadcrumb]} />
      <div className="bg-[#fbfcf7] min-h-screen">
        <ContactHero />
        <ContactForm />
        <ContactBottom />
      </div>
    </Layout>
  );
}
