'use client';

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    try {
      const pathname = window.location.pathname || '';
      const isProdBase = pathname.startsWith('/portfolio');
      const basePath = isProdBase ? '/portfolio' : '';
      const relativePath = isProdBase
        ? pathname.slice('/portfolio'.length)
        : pathname;

      // Check if non-existent URL started with /uk (e.g. /uk, /uk/..., /ukraine)
      const isUk =
        relativePath.startsWith('/uk') || pathname.startsWith('/uk');
      const targetLang = isUk ? 'uk' : 'en';
      const targetUrl = `${basePath}/${targetLang}${window.location.search}${window.location.hash}`;

      window.location.replace(targetUrl);
    } catch {
      window.location.replace('/en');
    }
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
                var pathname = window.location.pathname || '';
                var isProdBase = pathname.indexOf('/portfolio') === 0;
                var basePath = isProdBase ? '/portfolio' : '';
                var relativePath = isProdBase ? pathname.slice('/portfolio'.length) : pathname;
                var isUk = relativePath.indexOf('/uk') === 0 || pathname.indexOf('/uk') === 0;
                var targetLang = isUk ? 'uk' : 'en';
                window.location.replace(basePath + '/' + targetLang + window.location.search + window.location.hash);
              } catch (e) {
                window.location.replace('/en');
              }
            })();
          `,
        }}
      />
    </div>
  );
}
