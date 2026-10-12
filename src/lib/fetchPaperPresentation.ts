/**
 * fetchPaperHero / fetchPaperImportantDates — Server-side utilities
 *
 * Load the Paper Presentation page sections managed from arogya-admin
 * (Pages & CMS → Paper Presentation). Cached for 30 seconds. Return null when the
 * backend is unreachable or nothing is saved — the section then shows its
 * built-in content.
 */

export interface PaperHeroData {
  eyebrow?: string;
  /** First line dark, the rest gold — the page's only H1 */
  title?: string;
  dividerImage?: string;
  dividerImageAlt?: string;
  /** "\n" = line break */
  description?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  /** "\n" = line break */
  badgeText?: string;
}

export interface PaperDate {
  /** "\n" splits the two lines */
  label: string;
  date: string;
  icon?: string;
  iconAlt?: string;
}

export interface PaperImportantDatesData {
  heading?: string;
  headingIcon?: string;
  headingIconAlt?: string;
  dates?: PaperDate[];
  whyHeading?: string;
  whyLeafImage?: string;
  whyLeafImageAlt?: string;
  reasons?: { text: string }[];
}

export interface PaperTopic {
  title: string;
  /** "\n" = line break (the first line does not wrap) */
  description?: string;
  icon?: string;
  iconAlt?: string;
}

export interface PaperTopicsData {
  heading?: string;
  headingIcon?: string;
  headingIconAlt?: string;
  decorImage?: string;
  decorImageAlt?: string;
  topics?: PaperTopic[];
}

export interface PaperGuidelinesData {
  guidelinesHeading?: string;
  guidelinesIcon?: string;
  guidelinesIconAlt?: string;
  guidelines?: { text: string }[];
  guidelinesImage?: string;
  guidelinesImageAlt?: string;
  downloadLabel?: string;
  /** An uploaded PDF (served at /paper-guidelines) or any link; empty = button without a link */
  downloadHref?: string;
  submissionHeading?: string;
  submissionIcon?: string;
  submissionIconAlt?: string;
  steps?: { num: string; title: string; description: string }[];
  submissionImage?: string;
  submissionImageAlt?: string;
  submitLabel?: string;
  submitHref?: string;
  leafImage?: string;
  leafImageAlt?: string;
}

export interface PaperAwardsData {
  heading?: string;
  headingIcon?: string;
  headingIconAlt?: string;
  /** title: "\n" splits it into the two lines of the card */
  awards?: { title: string; icon?: string; iconAlt?: string }[];
  graphic?: string;
  graphicAlt?: string;
}

export interface PaperWhyChooseData {
  heading?: string;
  /** title: "\n" = line break */
  features?: { title: string; icon?: string; iconAlt?: string }[];
  footnote?: string;
  /** "\n" = line break */
  ctaText?: string;
  /** "\n" = line break */
  ctaHeading?: string;
  leafImage?: string;
  leafImageAlt?: string;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

const fetchSection = async <T,>(path: string): Promise<T | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}${path}`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as T) : null;
  } catch {
    return null;
  }
};

export const fetchPaperHero = () => fetchSection<PaperHeroData>('/paper-hero');
export const fetchPaperImportantDates = () => fetchSection<PaperImportantDatesData>('/paper-important-dates');
export const fetchPaperTopics = () => fetchSection<PaperTopicsData>('/paper-topics');
export const fetchPaperGuidelines = () => fetchSection<PaperGuidelinesData>('/paper-guidelines');
export const fetchPaperAwards = () => fetchSection<PaperAwardsData>('/paper-awards');
export const fetchPaperWhyChoose = () => fetchSection<PaperWhyChooseData>('/paper-why-choose');

export interface PaperNeedHelpData {
  heading?: string;
  description?: string;
  /** Already resolved: the top bar's first email / phone when "Same as top bar" is on */
  email: string;
  phone: string;
  icon?: string;
  iconAlt?: string;
  leafImage?: string;
  leafImageAlt?: string;
}

/** "Need Help?" with its email / phone resolved against the top bar contact (Settings) */
export const fetchPaperNeedHelp = async (): Promise<PaperNeedHelpData | null> => {
  const [section, settings] = await Promise.all([
    fetchSection<PaperNeedHelpData & { sameAsTopbar?: boolean }>('/paper-need-help'),
    fetchSection<{ topbarEmails?: string[]; topbarPhones?: string[] }>('/settings'),
  ]);
  if (!section) return null;
  const { sameAsTopbar, ...rest } = section;
  if (sameAsTopbar === false) return rest;
  return {
    ...rest,
    email: settings?.topbarEmails?.[0] || section.email,
    phone: settings?.topbarPhones?.[0] || section.phone,
  };
};
