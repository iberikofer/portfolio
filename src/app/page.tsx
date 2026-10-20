'use client';

import { useEffect } from 'react';
import { LANGUAGE_STORAGE_KEY } from '../context/LanguageContext';

export default function RootRedirect() {
  useEffect(() => {
    let lang = 'en';
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'uk' || saved === 'en') {
        lang = saved;
      } else if (
        navigator.language &&
        navigator.language.toLowerCase().startsWith('uk')
      ) {
        lang = 'uk';
      }
    } catch {
      // fallback to en
    }

    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/portfolio' : '';
    const targetUrl = `${basePath}/${lang}${window.location.search}${window.location.hash}`;
    window.location.replace(targetUrl);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var saved = localStorage.getItem('portfolio_filter_lang');
                var lang = (saved === 'uk' || (!saved && navigator.language && navigator.language.toLowerCase().indexOf('uk') === 0)) ? 'uk' : 'en';
                var isProd = window.location.pathname.indexOf('/portfolio') === 0;
                var base = isProd ? '/portfolio' : '';
                window.location.replace(base + '/' + lang + window.location.search + window.location.hash);
              } catch(e) {
                window.location.replace('/en');
              }
            })();
          `,
        }}
      />
    </div>
  );
}
