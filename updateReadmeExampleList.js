// Import required modules
const fs = require('fs');
const path = require('path');

// Function to get directory tree
function getDirectoryTree(dirPath, rootPath, depth = 0) {
  // If there's no 'package.json' in the directory, return null
  if(!fs.existsSync(path.join(dirPath, 'package.json'))){
    return null;
  }

  const result = { name: path.basename(dirPath), path: path.relative(rootPath, dirPath), children: [], description: 'No description' };

  // Check if 'package.json' exists in the directory
  const packageJson = require(path.join(dirPath, 'package.json'));

  if(packageJson.ignored === true) return null;

  if(!packageJson.description && depth > 1) {
    console.log('depth', depth, 'no description', dirPath);
    return null;
  }

  result.name = packageJson.name || result.name;
  result.description = packageJson.description || result.description;

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

  let markdown = `${'  '.repeat(depth)}- [${tree.name}](${tree.path}) &mdash; ${tree.description}\n`;

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
