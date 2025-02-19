import Head from 'next/head';
import { usePathname } from 'next/navigation';


const defaultMeta = {
  title: "Meu App",
  description: "Descrição padrão do meu aplicativo.",
  keywords: "app, nextjs, seo",
  author: "Meu Nome",
  url: "https://meusite.com",
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
const  pathname  = usePathname();

  const metaTitle = title ? `${title} | ${defaultMeta.title}` : defaultMeta.title;
  const metaDescription = description || defaultMeta.description;
  const metaKeywords = keywords || defaultMeta.keywords;
  const metaUrl = `${defaultMeta.url}${pathname}`;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={defaultMeta.author} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  );
}
