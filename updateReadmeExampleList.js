// Import required modules
const fs = require('fs');
const path = require('path');

// Function to recursively search for configuration files
function searchConfigFiles(dirPath) {
  // List files to search for
  const configFiles = ['rspack.config.js', 'rspack.config.ts','rspack.dev.js','rspack.prod.js', 'rsbuild.config.js', 'rsbuild.config.ts', 'webpack.config.js','webpack.client.js','modern.config.js','next.config.js'];
  const foundFiles = { rspack: false, webpack: false };

  // Traverse the directory tree
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.resolve(dirPath, files[i]);
    const stat = fs.statSync(filePath);

    // If the file is a directory and not 'node_modules', search it for configuration files
    if (stat.isDirectory() && files[i] !== 'node_modules') {
      const found = searchConfigFiles(filePath);
      foundFiles.rspack = foundFiles.rspack || found.rspack;
      foundFiles.webpack = foundFiles.webpack || found.webpack;
    } else if (configFiles.includes(files[i])) {
      // If the file is a configuration file, update foundFiles
      if (files[i].includes('rspack') || files[i].includes('rsbuild')) {
        foundFiles.rspack = true;
      } else if (files[i].includes('webpack') || files[i].includes('next.config')) {
        foundFiles.webpack = true;
      }
    }
  }

  return foundFiles;
}

// Function to get directory tree
function getDirectoryTree(dirPath, rootPath, depth = 0) {
  // If there's no 'package.json' in the directory, return null
  if(!fs.existsSync(path.join(dirPath, 'package.json'))){
    return null;
  }

  const result = { name: path.basename(dirPath), path: path.relative(rootPath, dirPath), children: [], description: 'No description', rspack: false, webpack: false };

  // Check if 'package.json' exists in the directory
  const packageJson = require(path.join(dirPath, 'package.json'));

  if(packageJson.ignored === true) return null;

  if(!packageJson.description && depth > 1) {
    console.log('depth', depth, 'no description', dirPath);
    return null;
  }

  result.name = packageJson.name || result.name;
  result.description = packageJson.description || result.description;

  // Check for 'rspack' or 'webpack' configuration files
  const foundFiles = searchConfigFiles(dirPath);
  result.rspack = foundFiles.rspack;
  result.webpack = foundFiles.webpack;

  const files = fs.readdirSync(dirPath);

  // Loop through each file in the directory
  files.forEach((file) => {
    const filePath = path.resolve(dirPath, file);
    const stat = fs.statSync(filePath);

    // If the file is a directory, not 'node_modules', not '.git', not '.next', and contains 'package.json'
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git' && file !== '.next') {
      const child = getDirectoryTree(filePath, rootPath, depth + 1);
      if(child){
        result.children.push(child);
      }
    }
  });

  return result;
}

// Function to convert tree to markdown
function treeToMarkdown(tree, depth = 0) {
  if(!tree){
    return '';
  }
  let markdown = `${'  '.repeat(depth)}- [${tree.name}](${tree.path})`;

  if (tree.rspack || tree.webpack) {
    markdown += ` -- ${tree.rspack ? '✅ rspack' : '❌ rspack'} | ${tree.webpack ? '✅ webpack' : '❌ webpack'}`;
  }

  markdown += ` <br> ${tree.description} \n`;

  tree.children.forEach((child) => {
    markdown += treeToMarkdown(child, depth + 1);
  });

  return markdown;
}

// Main function
function main() {
  const rootPath = path.resolve('./');
  const tree = getDirectoryTree(rootPath, rootPath);
  const markdown = treeToMarkdown(tree);

  // Write the markdown to 'output.md'
  fs.writeFileSync('output.md', markdown);
}

// Call the main function
main();
