import { notFound } from 'next/navigation';
import { Language } from '../../data/translations';
import PortfolioView from '../../components/PortfolioView';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'uk' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === 'uk';
  return {
    title: isUk ? 'Ярослав Сич' : 'Yaroslav Sych',
    description: isUk
      ? 'Портфоліо Ярослава Сича — Fullstack розробника на React, Node.js та сучасних веб-технологіях.'
      : 'Portfolio of Yaroslav Sych — Fullstack JavaScript/TypeScript Developer specializing in React, Node.js, and modern high-craft web applications.',
  };
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'uk') {
    notFound();
  }

  const isUk = lang === 'uk';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://iberikofer.github.io/portfolio/#person',
        name: isUk ? 'Ярослав Сич' : 'Yaroslav Sych',
        jobTitle: isUk ? 'Fullstack JS Розробник' : 'Fullstack JS Developer',
        url: 'https://iberikofer.github.io/portfolio',
        sameAs: [
          'https://github.com/iberikofer',
          'https://www.linkedin.com/in/yaroslav-sych/',
          'https://t.me/YSych',
        ],
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'HTML5',
          'SCSS',
          'REST APIs',
          'Git',
          'C++',
          'Java',
          'Python',
        ],
        description: isUk
          ? 'Портфоліо Ярослава Сича — Fullstack розробника на React, Node.js та сучасних веб-технологіях.'
          : 'Portfolio of Yaroslav Sych — Fullstack JavaScript/TypeScript Developer specializing in React, Node.js, and modern high-craft web applications.',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://iberikofer.github.io/portfolio/#website',
        url: 'https://iberikofer.github.io/portfolio',
        name: isUk ? 'Портфоліо Ярослава Сича' : 'Yaroslav Sych Portfolio',
        inLanguage: ['en', 'uk'],
        author: {
          '@id': 'https://iberikofer.github.io/portfolio/#person',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `https://iberikofer.github.io/portfolio/${lang}#profilepage`,
        url: `https://iberikofer.github.io/portfolio/${lang}`,
        name: isUk ? 'Ярослав Сич | Профіль' : 'Yaroslav Sych | Profile',
        mainEntity: {
          '@id': 'https://iberikofer.github.io/portfolio/#person',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioView initialLang={lang as Language} />
    </>
  );
}
