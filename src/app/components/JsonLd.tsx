import Script from 'next/script';

export const WebsiteJsonLd = () => {
  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'InstaGrab - Instagram Content Downloader',
          url: 'https://www.instagrab.download',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.instagrab.download/?url={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          description: 'Download Instagram Videos, Photos, Reels, Stories & Carousels easily with InstaGrab. No watermarks, fast and free!',
          publisher: {
            '@type': 'Organization',
            name: 'InstaGrab',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.instagrab.download/logo.png'
            }
          }
        })
      }}
    />
  );
};

export const SoftwareApplicationJsonLd = () => {
  return (
    <Script
      id="software-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'InstaGrab',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250'
          }
        })
      }}
    />
  );
};

export const FAQJsonLd = ({ questions }: { questions: Array<{question: string, answer: string}> }) => {
  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: questions.map(q => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          }))
        })
      }}
    />
  );
};

export const BreadcrumbJsonLd = ({ items }: { items: Array<{name: string, item: string}> }) => {
  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item
          }))
        })
      }}
    />
  );
}; 