const { execSync } = require('child_process');
const readline = require('readline');

// Store the command line arguments after the script name
const args = process.argv.slice(2);

// Create a string of the original jsrepo command
const jsrepoCommand = `jsrepo ${args.join(' ')}`;

try {
  // Run jsrepo and capture its output
  const output = execSync(jsrepoCommand, { encoding: 'utf8' });
  
  // Split output into lines
  const lines = output.split('\n');
  
  // Look for lines that indicate block additions
  const blockPaths = lines
    .filter(line => line.includes('github/bettergooddev/better-kit/blocks/'))
    .map(line => {
      // Extract the block path (e.g., "blocks/CallToAction" from the full path)
      const match = line.match(/better-kit\/(blocks\/[^/]+)/);
      return match ? match[1] : null;
    })
    .filter(Boolean); // Remove any null values
  
  // For each block path found, run the updateRenderBlocks script
  for (const blockPath of blockPaths) {
    try {
      execSync(`node src/utilities/updateRenderBlocks.js "${blockPath}"`, {
        stdio: 'inherit'
      });
    } catch (err) {
      console.error(`Failed to update RenderBlocks for ${blockPath}`);
    }
  }
  
  // Print the original jsrepo output
  console.log(output);
} catch (error) {
  console.error('Error running jsrepo:', error.message);
  process.exit(1);
} 