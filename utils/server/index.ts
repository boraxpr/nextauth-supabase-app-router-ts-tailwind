export const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export function getUrl(url?: string) {
  return `${baseUrl}${url}`;
}
