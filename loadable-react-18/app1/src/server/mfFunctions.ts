import axios from 'axios';

const mfAppNames = ['app2'].join('|');
const mfAppNamesRegex = RegExp(`(${mfAppNames})-.*`);
const mfStatsUrlMap = {
  app2: 'http://localhost:3001/static/federation-stats.json',
};

const isMfComponent = component => mfAppNamesRegex.test(component);

/**
 * @param {Object} extractor - loadable-components extractor
 * @return {string[]} chunk ids of the rendered components.
 */
export const getLoadableRequiredComponents = extractor => {
  const scriptElements = extractor?.getScriptElements?.() ?? [];

  const loadableElement = scriptElements.find(
    el => el?.key === '__LOADABLE_REQUIRED_CHUNKS___ext',
  );

  if (!loadableElement) {
    return [];
  }

  try {
    const rawHtml = loadableElement.props?.dangerouslySetInnerHTML?.__html;

    if (!rawHtml) {
      return [];
    }

    const parsedData = JSON.parse(rawHtml);
    const { namedChunks } = parsedData ?? {};

    return Array.isArray(namedChunks) ? namedChunks : [];
  } catch (error) {
    console.error('[getLoadableRequiredComponents] Failed to parse required chunks', error);
    return [];
  }
};

const getMfRenderedComponents = loadableRequiredComponents => {
  return loadableRequiredComponents.reduce((result, component) => {
    if (isMfComponent(component)) result.push(component.split('-'));
    return result;
  }, []);
};

const getMFStats = async () => {
  const promises = Object.values(mfStatsUrlMap).map(url => axios.get(url));

  try {
    const responses = await Promise.all(promises);

    return responses.map(response => response.data);
  } catch (error) {
    console.error('[getMFStats] Failed to fetch remote federation stats', error);
    return [];
  }
};

export const getMfChunks = async extractor => {
  const loadableRequiredComponents = getLoadableRequiredComponents(extractor);

  if (!loadableRequiredComponents.length) {
    return [[], []];
  }

  const mfRenderedComponents = getMfRenderedComponents(loadableRequiredComponents);

  if (!mfRenderedComponents.length) {
    return [[], []];
  }

  const mfChunks = await getMFStats();

  if (!mfChunks.length) {
    return [[], []];
  }

  const scriptsArr: string[] = [];
  const stylesArr: string[] = [];

  mfRenderedComponents.forEach(([appName, component]) => {
    const remoteStats = mfChunks.find(remote => remote?.name === appName);
    const exposeChunks = remoteStats?.exposes?.[component];

    if (!Array.isArray(exposeChunks)) {
      return;
    }

    exposeChunks.forEach(chunk => {
      const url = 'http://localhost:3001/static/' + chunk;

      url.endsWith('.css') ? stylesArr.push(url) : scriptsArr.push(url);
    });
  });

  return [scriptsArr, stylesArr];
};

export const createScriptTag = chunk => `<script defer src="${chunk}"></script>`;

export const createStyleTag = chunk => `<link href="${chunk}" type="text/css" rel="stylesheet">`;
