import { readFileSync } from 'fs';
import { NFPDashboardToken } from './schema';

/**
 *
 */
export function readFileTokens(path: string): NFPDashboardToken {
  const tokenArray: string[][] = readFileSync(path)
    .toString('utf-8')
    .split('\n')
    .filter(Boolean)
    .map((s) => s.trim().split('='));

  const tokens: NFPDashboardToken = {} as NFPDashboardToken;

  for (const [name, token] of tokenArray) {
    tokens[name] = token;
  }

  return tokens;
}

/**
 * 
 */
export function replaceWithTokens(url: string, tokens: NFPDashboardToken): string {
  for (const [name, token] of Object.entries(tokens)) {
    url = url.replace(new RegExp(`{${name}}`), token);
  }

  return url;
}
