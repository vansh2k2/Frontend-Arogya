import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useSeo } from '../../contexts/SeoContext';
import { SERVER_URL } from '../../lib/api';

const SeoHelmet = () => {
  const location = useLocation();
  const { seoData, customSeo } = useSeo();

  // Determine which SEO data to use: custom (like a specific blog post) or matched from route
  const currentSeo = customSeo || seoData.find((seo) => seo.page === location.pathname && seo.isActive);

  if (!currentSeo) return null; // Fallback to default index.html tags if no match

  // Function to clean and parse HTML tags from strings (like openGraphTags)
  const parseHtmlTags = (htmlString) => {
    if (!htmlString) return null;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      return Array.from(doc.head.childNodes).map((node, index) => {
        if (node.nodeType === 1) { // Element node
          const props = { key: index };
          Array.from(node.attributes).forEach(attr => {
            props[attr.name] = attr.value;
          });
          return React.createElement(node.tagName.toLowerCase(), props);
        }
        return null;
      });
    } catch (e) {
      console.error('Error parsing custom tags:', e);
      return null;
    }
  };

  const ogImageUrl = currentSeo.ogImage 
    ? (currentSeo.ogImage.startsWith('http') ? currentSeo.ogImage : `${SERVER_URL}${currentSeo.ogImage}`)
    : 'https://arogya.namogange.org/ogimage.png';

  const getCanonicalUrl = (tagStr) => {
    if (!tagStr) return null;
    const match = tagStr.match(/href=["']([^"']+)["']/);
    if (match) return match[1];
    return tagStr; // Assume it's just the URL if no href attribute is found
  };

  return (
    <Helmet>
      {currentSeo.metaTitle && <title>{currentSeo.metaTitle}</title>}
      {currentSeo.metaDescription && <meta name="description" content={currentSeo.metaDescription} />}
      {currentSeo.metaKeywords && <meta name="keywords" content={currentSeo.metaKeywords} />}
      
      {/* Default OG Tags from fields if openGraphTags string is empty, otherwise let parseHtmlTags handle it */}
      {!currentSeo.openGraphTags && currentSeo.metaTitle && <meta property="og:title" content={currentSeo.metaTitle} />}
      {!currentSeo.openGraphTags && currentSeo.metaDescription && <meta property="og:description" content={currentSeo.metaDescription} />}
      {!currentSeo.openGraphTags && ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      {!currentSeo.openGraphTags && <meta property="og:url" content={window.location.href} />}
      
      {/* Canonical Tag */}
      {currentSeo.canonicalTag && currentSeo.canonicalTag.trim() !== '' ? (
        <link rel="canonical" href={getCanonicalUrl(currentSeo.canonicalTag)?.trim()} />
      ) : (
        <link rel="canonical" href={`${window.location.origin}${window.location.pathname}`} />
      )}

      {/* Render raw HTML for custom OG tags if provided */}
      {currentSeo.openGraphTags && parseHtmlTags(currentSeo.openGraphTags)}

      {/* Render JSON-LD Schema */}
      {currentSeo.schemaMarkup && (
        (() => {
          const schemaString = currentSeo.schemaMarkup;
          const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
          const matches = [...schemaString.matchAll(scriptRegex)];

          if (matches.length > 0) {
            return matches.map((match, index) => (
              <script key={`schema-${index}`} type="application/ld+json" innerHTML={match[1]} />
            ));
          } else {
            return <script type="application/ld+json" innerHTML={schemaString} />;
          }
        })()
      )}
    </Helmet>
  );
};

export default SeoHelmet;
