export default async function serverRender(req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.write('<!DOCTYPE html>');
  res.write('<html>');

  const { renderAndExtractContext } = await import('./serverAppEntrypoint');

  const { markup, linkTags, scriptTags } = await renderAndExtractContext({});

  res.write(`<head>${linkTags}</head><body>`);
  res.write(`<div id="root">${markup}</div>`);

  res.write(scriptTags);
  res.write('</body></html>');
  res.send();

  next();
}
