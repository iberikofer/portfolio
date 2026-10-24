import { notFound } from 'next/navigation';
import { Language, TRANSLATIONS } from '../../data/translations';
import PortfolioView from '../../components/PortfolioView';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'uk' }, { lang: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const currentLang: Language =
    lang === 'uk' || lang === 'es' || lang === 'en' ? lang : 'en';
  const t = TRANSLATIONS[currentLang];
  return {
    title: t.meta.title,
    description: t.meta.description,
  };
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'uk' && lang !== 'es') {
    notFound();
  }

  const isUk = lang === 'uk';
  const isEs = lang === 'es';

  const jobTitle = isUk
    ? 'Fullstack JS Розробник'
    : isEs
      ? 'Desarrollador Fullstack JS'
      : 'Fullstack JS Developer';

  const siteName = isUk
    ? 'Портфоліо Ярослава Сича'
    : isEs
      ? 'Portafolio de Yaroslav Sych'
      : 'Yaroslav Sych Portfolio';

  const profilePageName = isUk
    ? 'Ярослав Сич | Профіль'
    : isEs
      ? 'Yaroslav Sych | Perfil'
      : 'Yaroslav Sych | Profile';

  const metaDesc = isUk
    ? 'Портфоліо Ярослава Сича — Fullstack розробника на React, Node.js та сучасних веб-технологіях.'
    : isEs
      ? 'Portafolio de Yaroslav Sych — Desarrollador Fullstack JavaScript/TypeScript especializado en React, Node.js y aplicaciones web modernas.'
      : 'Portfolio of Yaroslav Sych — Fullstack JavaScript/TypeScript Developer specializing in React, Node.js, and modern high-craft web applications.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://iberikofer.github.io/portfolio/#person',
        name: isUk ? 'Ярослав Сич' : 'Yaroslav Sych',
        jobTitle,
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
        description: metaDesc,
      },
      {
        '@type': 'WebSite',
        '@id': 'https://iberikofer.github.io/portfolio/#website',
        url: 'https://iberikofer.github.io/portfolio',
        name: siteName,
        inLanguage: ['en', 'uk', 'es'],
        author: {
          '@id': 'https://iberikofer.github.io/portfolio/#person',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `https://iberikofer.github.io/portfolio/${lang}#profilepage`,
        url: `https://iberikofer.github.io/portfolio/${lang}`,
        name: profilePageName,
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
