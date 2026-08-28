export const INSTAGRAM_HANDLE = "collab.living";

export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const INSTAGRAM_REELS_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/reels/`;

/**
 * Paste reel links from Instagram (⋯ → Copy link).
 * Env override: NEXT_PUBLIC_INSTAGRAM_REEL_URLS (comma-separated URLs).
 */
export const FEATURED_REEL_URLS: string[] = [];

export function getFeaturedReelUrls(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_INSTAGRAM_REEL_URLS
    ?.split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  if (fromEnv?.length) return fromEnv;
  return FEATURED_REEL_URLS;
}

export function reelEmbedUrl(urlOrShortcode: string): string {
  const match = urlOrShortcode.match(/\/reel\/([A-Za-z0-9_-]+)/);
  const shortcode = match?.[1] ?? urlOrShortcode.replace(/\/$/, "");
  return `https://www.instagram.com/reel/${shortcode}/embed`;
}
