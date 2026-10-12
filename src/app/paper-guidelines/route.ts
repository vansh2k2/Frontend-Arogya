/**
 * GET /paper-guidelines — the author guidelines PDF ("Download Guidelines" on the
 * Paper Presentation page).
 *
 * The link is managed from arogya-admin (Pages & CMS → Paper Presentation →
 * Guidelines & Submission); an uploaded PDF is streamed back as application/pdf
 * (see lib/pdfProxy). Nothing saved / backend down → back to the Paper Presentation page.
 */
import { getApiBase, servePdfLink } from '@/lib/pdfProxy';

const FALLBACK = '/paper-presentation';

async function guidelinesLink(): Promise<string> {
  try {
    const res = await fetch(`${getApiBase()}/paper-guidelines`, { cache: 'no-store' });
    const json = await res.json();
    return String(json?.data?.downloadHref || '').trim();
  } catch {
    return '';
  }
}

export async function GET(request: Request) {
  return servePdfLink(request, await guidelinesLink(), 'arogya-sanghosthi-paper-guidelines.pdf', FALLBACK);
}
