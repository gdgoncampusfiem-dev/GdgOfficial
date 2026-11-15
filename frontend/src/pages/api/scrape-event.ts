import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST /api/scrape-event
 * Body: { url: string }
 *
 * Fetches the GDG community page and extracts Open Graph meta tags
 * (og:title, og:image, og:description) so we can display the event poster.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid url' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; GDGBot/1.0; +https://gdg.community.dev)',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Failed to fetch URL (${response.status})` });
    }

    const html = await response.text();

    // Extract Open Graph meta tags with a simple regex (no extra dependencies needed)
    const getMeta = (property: string): string => {
      // Matches <meta property="og:___" content="..." /> in any attribute order
      const re = new RegExp(
        `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']` +
        `|<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`,
        'i'
      );
      const match = html.match(re);
      return match ? (match[1] || match[2] || '') : '';
    };

    const title       = getMeta('og:title')       || 'Untitled Event';
    const image       = getMeta('og:image')        || '';
    const description = getMeta('og:description')  || '';

    // Try to extract the event date from the page
    // GDG pages often have a <time> tag or a date string like "Sep 1, 2024"
    const timeMatch = html.match(/<time[^>]*datetime=["']([^"']*)["']/i);
    let date = '';
    if (timeMatch) {
      date = timeMatch[1].split('T')[0]; // "2024-09-01"
    }

    return res.status(200).json({ title, image, description, date, url });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
