/**
 * Serving admin-uploaded PDFs (route handlers like /brochure and /paper-guidelines).
 *
 * A PDF uploaded from arogya-admin lives on Cloudinary as an extension-less raw
 * file (the Cloudinary account blocks .pdf delivery), which Cloudinary serves as
 * octet-stream — so it is streamed back as application/pdf, opening in the
 * browser's PDF viewer with a proper file name. Any other saved link (a site path,
 * an external URL) is simply redirected to.
 */

export const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

/** Only our own Cloudinary raw uploads are proxied — never an arbitrary URL */
export const isUploadedPdf = (link: string) => /^https:\/\/res\.cloudinary\.com\/[^/]+\/raw\/upload\//.test(link);

export async function servePdfLink(request: Request, link: string, fileName: string, fallback: string): Promise<Response> {
  if (!link) return Response.redirect(new URL(fallback, request.url), 302);

  if (isUploadedPdf(link)) {
    const file = await fetch(link, { cache: 'no-store' }).catch(() => null);
    if (file?.ok && file.body) {
      return new Response(file.body, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${fileName}"`,
          'Cache-Control': 'public, max-age=60',
        },
      });
    }
    return Response.redirect(new URL(fallback, request.url), 302);
  }

  return Response.redirect(new URL(link, request.url), 302);
}
