require('dotenv').config();
const fs = require('fs');
const path = require('path');
// const AWS = require('aws-sdk');
const semver = require('semver');

// const federatedModules = require('../federated-modules').default;

// const s3Client = new AWS.S3({
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     endpoint: process.env.S3_ENDPOINT,
//     sslEnabled: process.env.S3_ENDPOINT === 'http://localhost:4568' ? false : true,
//     s3ForcePathStyle: true,
// });

async function run() {
  // const remoteDependencies = await Promise.all(federatedModules.map(async (federatedModule) => {
  //     const remotePackageObject = await s3Client.getObject({
  //         Bucket: federatedModule.bucketName,
  //         Key: 'package.json',
  //     }).promise();
  //
  //     const remotePackage = JSON.parse(remotePackageObject.Body.toString());
  //
  //     return remotePackage.dependencies;
  // }));
  const remoteDependencies = [require('../../federated-middleware/package.json').dependencies];

  const dependencies = [...remoteDependencies, require('../package.json').dependencies].reduce(
    (dependencies, noServiceDeps) => {
      Object.keys(noServiceDeps).forEach(packageName => {
        const version = noServiceDeps[packageName];
        const semverVersion =
          version.startsWith('^') || version.startsWith('~') ? version.substr(1) : version;

        if (dependencies[packageName]) {
          const lastSemverVersion =
            dependencies[packageName].startsWith('^') || dependencies[packageName].startsWith('~')
              ? dependencies[packageName].substr(1)
              : version;

          if (!semver.satisfies(semverVersion, dependencies[packageName])) {
            throw new Error(
              `Package ${packageName} has miss-match versions of ${version} and ${dependencies[packageName]}.`,
            );
          }

          if (semver.gte(semverVersion, lastSemverVersion)) {
            dependencies[packageName] = noServiceDeps[packageName];
          } else {
            console.log(
              `Package ${packageName} is using newer version ${dependencies[packageName]} of ${packageName} supplied by another no-service.`,
            );
          }
        } else {
          dependencies[packageName] = noServiceDeps[packageName];
        }
      });

      return dependencies;
    },
    {},
  );

  const pkg = {
    private: true,
    name: 'build-temp',
    dependencies,
  };

  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  await new Promise((resolve, reject) =>
    fs.writeFile(
      path.join(distDir, 'package.json'),
      JSON.stringify(pkg, null, 2),
      { encoding: 'utf-8' },
      err => (err ? reject(err) : resolve()),
    ),
  );
}

run().catch(err => console.error(err));
