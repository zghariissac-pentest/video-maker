const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const compositionId = process.argv[2];

if (!compositionId) {
  console.error('Please provide a composition ID.');
  console.error('Usage: npm run export-last <CompositionID>');
  process.exit(1);
}

try {
  console.log('Fetching compositions...');
  const output = execSync('npx remotion compositions', { encoding: 'utf-8' });
  
  // Parse the output line by line
  const lines = output.split('\n');
  let durationInFrames = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // Regex to match: ID FPS WidthxHeight Duration (Time)
    // Example: Intro 30 1080x1920 180 (6.00 sec)
    const match = trimmedLine.match(/^(\S+)\s+\d+\s+\d+x\d+\s+(\d+)/);
    
    if (match && match[1] === compositionId) {
      durationInFrames = parseInt(match[2], 10);
      break;
    }
  }

  if (durationInFrames === null) {
    console.error(`Composition "${compositionId}" not found.`);
    console.log('Available compositions found in output:');
    console.log(output);
    process.exit(1);
  }
  const lastFrame = durationInFrames - 1;
  const outputFile = `${compositionId}.png`;

  console.log(`Exporting last frame (${lastFrame}) of "${compositionId}" to ${outputFile}...`);

  execSync(`npx remotion still ${compositionId} ${outputFile} --frame=${lastFrame}`, { stdio: 'inherit' });

  console.log(`Successfully exported ${outputFile}`);

} catch (error) {
  console.error('Error exporting frame:', error);
  process.exit(1);
}
