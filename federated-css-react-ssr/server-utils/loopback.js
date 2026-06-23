'use strict';

const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

function sanitizeLoopbackHttpUrl(rawUrl) {
  const url = new URL(rawUrl);
  if (url.protocol !== 'http:') {
    throw new Error(`Only http:// loopback URLs are supported for prewarm. Received: ${rawUrl}`);
  }
  if (!LOOPBACK_HOSTS.has(url.hostname)) {
    throw new Error(`Refusing to access non-loopback host "${url.hostname}" for URL: ${rawUrl}`);
  }
  if (!url.port) {
    url.port = '80';
  }
  return url;
}

module.exports = {
  sanitizeLoopbackHttpUrl,
  LOOPBACK_HOSTS,
};
