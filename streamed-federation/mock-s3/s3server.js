const S3rver = require("s3rver");
const express = require("express");
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs-extra");
const Module = require("module");

const app = express();

const buckets = [{ name: "bucket1" }];

const { port } = S3rver.defaultOptions;

function nameResolution(resolutor) {
  let enabled = true;

  const originalResolveFilename = Module._resolveFilename;

  Module._resolveFilename = function (request, _parent) {
    const match = enabled && resolutor(request, _parent);
    if (match) {
      return match;
    }

    return originalResolveFilename.apply(this, arguments);
  };

  return () => {
    enabled = false;
  };
}

function requireFromString(code, filename, opts) {
  if (typeof filename === "object") {
    opts = filename;
    filename = undefined;
  }

  opts = opts || {};
  filename = filename || "";

  opts.appendPaths = opts.appendPaths || [];
  opts.prependPaths = opts.prependPaths || [];

  if (typeof code !== "string") {
    throw new Error(`code must be a string, not ${typeof code}`);
  }
  const paths = Module._nodeModulePaths(path.dirname(filename));

  const { parent } = module;

  const m = new Module(filename, parent);

  m.filename = filename;
  m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
  require.cache[m.id] = m;
  console.log("33333", JSON.stringify(m.id));
  m._compile(code, filename);

  const { exports } = m;
  parent &&
    parent.children &&
    parent.children.splice(parent.children.indexOf(m), 1);
  m.loaded = true; // added this, dont know if i need it

  return exports;
}

const server = new S3rver({
  port,
  hostname: "localhost",
  silent: false,
  directory: "./bucket-resources",
  configureBuckets: buckets,
});

nameResolution((requireName, parent) => {
  const whatDidIRequire = path.resolve(path.dirname(parent.id), requireName);
  // if something is found in the cache
  // - just return it without checking the real FS

  if (require.cache[whatDidIRequire]) {
    return whatDidIRequire;
  }
  const andWithJS = whatDidIRequire + ".js";
  if (require.cache[andWithJS]) {
    return andWithJS;
  }
});

const initializeS3 = async () => {
  app.use("/basepath", server.getMiddleware());
  await server.configureBuckets();

  let httpServer;
  await new Promise((resolve, reject) => {
    httpServer = app.listen(S3rver.defaultOptions.port, (err) =>
      err ? reject(err) : resolve()
    );
  });

  const s3Client = new AWS.S3({
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
    endpoint: `http://localhost:${port}/basepath`,
    sslEnabled: false,
    s3ForcePathStyle: true,
  });

  const files = [path.join(__dirname, "resources/index.js")];

  await s3Client
    .putObject({
      Bucket: buckets[0].name,
      Key: "index",
      Body: await fs.readFile(files[0]),
      ContentType: "application/javascript",
    })
    .promise();
  const object = await s3Client
    .getObject({ Bucket: buckets[0].name, Key: "index" })
    .promise();
  const streamedModule = object.Body.toString();
  const streamedFilePath = path.join(process.cwd(), "federatedFile.js");
  const readableModule = requireFromString(streamedModule, streamedFilePath, {
    appendPaths: ["/"],
  });

  console.log(readableModule);
  console.log(require.cache[require("path").resolve("./federatedFile.js")]);
  console.log(require("./federatedFile.js"));
};

initializeS3();
