import { track } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'download_resume'
  | 'toggle_language'
  | 'filter_scope_change'
  | 'filter_tag_toggle'
  | 'filter_reset'
  | 'view_project_source'
  | 'view_project_demo'
  | 'view_project_mockup'
  | 'view_project_docs'
  | 'submit_contact_form'
  | 'honeypot_trapped'
  | 'contact_rate_limited'
  | 'social_click'
  | 'github_profile_click';

/**
 * Universal event tracker for developer portfolio.
 * Dispatches safely to Vercel Analytics and logs in dev console for instant debugging.
 */
export const trackEvent = (
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c[Analytics] 📊 ${event}`,
        'color: #38bdf8; font-weight: bold; background: #0c4a6e; padding: 2px 6px; border-radius: 4px;',
        properties || '',
      );
    }
    track(event, properties);
  } catch {
    // Fail silently in environments with strict adblockers or offline
  }
};
