/**
 * GET /brochure — the conference brochure PDF (footer "Download PDF" + navbar button).
 *
 * The link is managed from arogya-admin (Pages & CMS → Footer → Brochure).
 * - A PDF uploaded there lives on Cloudinary as an extension-less raw file (the
 *   Cloudinary account blocks .pdf delivery), which Cloudinary serves as
 *   octet-stream — so it is streamed back here as application/pdf, opening in
 *   the browser's PDF viewer with a proper file name.
 * - Any other saved link (/pdf.pdf, an external URL) is simply redirected to.
 * - Nothing saved / backend down → the bundled /pdf.pdf.
 */
const FALLBACK = '/pdf.pdf';
const FILE_NAME = 'arogya-sanghosthi-brochure.pdf';

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

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
  const link = await brochureLink();

  // Only our own Cloudinary uploads are proxied — never an arbitrary URL
  if (/^https:\/\/res\.cloudinary\.com\/[^/]+\/raw\/upload\//.test(link)) {
    const file = await fetch(link, { cache: 'no-store' }).catch(() => null);
    if (file?.ok && file.body) {
      return new Response(file.body, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${FILE_NAME}"`,
          'Cache-Control': 'public, max-age=60',
        },
      });
    }
    return Response.redirect(new URL(FALLBACK, request.url), 302);
  }

  return Response.redirect(new URL(link, request.url), 302);
}
