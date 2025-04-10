// update-render-blocks.js
const fs = require('fs');
const path = require('path');

// Path to your RenderBlocks file
const renderBlocksPath = path.join(process.cwd(), 'src/blocks/RenderBlocks.ts');

// Get the block path from command line args
const blockPath = process.argv[2];

if (!blockPath) {
  console.error('Block path is required');
  process.exit(1);
}

// Only proceed if this is a block from src/blocks
if (!blockPath.startsWith('blocks/') || blockPath.includes('fields/')) {
  console.log('Not a block component, skipping RenderBlocks update');
  process.exit(0);
}

// Extract the block name from the path (e.g., "blocks/CallToAction" -> "CallToAction")
const blockName = blockPath.split('/')[1];

if (!blockName) {
  console.error('Could not determine block name from path');
  process.exit(1);
}

// Read the file
let content;
try {
  content = fs.readFileSync(renderBlocksPath, 'utf8');
} catch (err) {
  console.error('Could not find RenderBlocks.ts - skipping update');
  process.exit(0);
}

// Check if block is already imported
if (content.includes(`import { ${blockName}Block }`)) {
  console.log(`${blockName}Block is already imported - skipping update`);
  process.exit(0);
}

// Create the import statement
const importStatement = `import { ${blockName}Block } from '@/blocks/${blockName}/Component'`;

// Create the block component entry (convert to camelCase for the key)
const blockKey = blockName.charAt(0).toLowerCase() + blockName.slice(1);
const blockComponentEntry = `  ${blockKey}: ${blockName}Block,`;

// Find the last import statement
const lastImportIndex = content.lastIndexOf('import');
const lastImportEndIndex = content.indexOf('\n', lastImportIndex);

// Find the blockComponents object
const blockComponentsStart = content.indexOf('const blockComponents = {');
const blockComponentsEnd = content.indexOf('}', blockComponentsStart);

// Insert the new import after the last import
let updatedContent = content.slice(0, lastImportEndIndex + 1) + 
                     `\n${importStatement}` + 
                     content.slice(lastImportEndIndex + 1);

// Insert the new block component entry before the closing brace
updatedContent = updatedContent.slice(0, blockComponentsEnd) +
                `\n${blockComponentEntry}` +
                updatedContent.slice(blockComponentsEnd);

// Write back
fs.writeFileSync(renderBlocksPath, updatedContent);

console.log(`✓ Updated RenderBlocks.ts with ${blockName}Block`);
