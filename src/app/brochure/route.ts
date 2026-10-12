/**
 * GET /brochure — the conference brochure PDF (footer "Download PDF" + navbar button).
 *
 * The link is managed from arogya-admin (Pages & CMS → Footer → Brochure); an
 * uploaded PDF is streamed back as application/pdf (see lib/pdfProxy).
 * Nothing saved / backend down → the bundled /pdf.pdf.
 */
import { getApiBase, servePdfLink } from '@/lib/pdfProxy';

const FALLBACK = '/pdf.pdf';

async function brochureLink(): Promise<string> {
  try {
    const res = await fetch(`${getApiBase()}/settings`, { cache: 'no-store' });
    const json = await res.json();
    return String(json?.data?.footerExtras?.brochureUrl || '').trim() || FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export async function GET(request: Request) {
  return servePdfLink(request, await brochureLink(), 'arogya-sanghosthi-brochure.pdf', FALLBACK);
}
