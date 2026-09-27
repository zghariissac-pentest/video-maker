import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';

const args = parseArgs({
    options: {
        name: { type: 'string' },
        type: { type: 'string', default: 'video' }, // video or image
        style: { type: 'string', default: 'Minimal' },
        orientation: { type: 'string', default: 'vertical' }, // vertical or horizontal
    },
});

const { name, type, style, orientation } = args.values;

if (!name) {
    console.error("Error: --name is required.");
    process.exit(1);
}

const SRC_DIR = path.join(process.cwd(), 'src');
const TEMPLATES_DIR = path.join(SRC_DIR, 'machine-templates');
const GENERATED_DIR = path.join(SRC_DIR, 'machine-generated');
const REGISTRY_FILE = path.join(SRC_DIR, 'machine-registry.ts');

const styleDir = path.join(TEMPLATES_DIR, style);
const outDir = path.join(GENERATED_DIR, name);

if (!fs.existsSync(styleDir)) {
    console.error(`Error: Template style '${style}' not found in ${TEMPLATES_DIR}.`);
    process.exit(1);
}

if (fs.existsSync(outDir)) {
    console.error(`Error: A project named '${name}' already exists in ${GENERATED_DIR}.`);
    process.exit(1);
}

// Ensure generated dir exists
if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR);
}

// 1. Recursive copy function
function copyDirSync(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        let destName = entry.name.replace(/Template/g, name);
        const destPath = path.join(dest, destName);

        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else {
            let content = fs.readFileSync(srcPath, 'utf8');
            // Replace Template references with the new name
            content = content.replace(/Template/g, name);
            fs.writeFileSync(destPath, content, 'utf8');
        }
    }
}

// 2. Perform Copy
console.log(`Copying template '${style}' to '${name}'...`);
copyDirSync(styleDir, outDir);

// 3. Create prompt.md for AI instructions
const promptContent = `# Prompt for ${name}
Type: ${type}
Orientation: ${orientation}
Style: ${style}

**AI Instructions:**
1. Populate the scenes JSON below.
2. Edit the generated React components if custom behavior is needed.
3. Don't forget to update \`durationInFrames\` in machine-registry.ts if needed.

## Scene Text:
\`\`\`json
[
  { "text": "Scene 1 placeholder" }
]
\`\`\`
`;
fs.writeFileSync(path.join(outDir, 'prompt.md'), promptContent, 'utf8');

// 4. Register to machine-registry.ts
const width = orientation === 'vertical' ? 1080 : 1920;
const height = orientation === 'vertical' ? 1920 : 1080;

// The template should export the main component as exactly the Name.
// i.e. export const MyNewVideo = ...
const registryAppend = `\n// Generated: ${name}
import { ${name} } from "./machine-generated/${name}/${name}";
machineCompositions.push({
  id: "${name}",
  component: ${name},
  durationInFrames: 300,
  fps: 30,
  width: ${width},
  height: ${height}
});\n`;

fs.appendFileSync(REGISTRY_FILE, registryAppend, 'utf8');

console.log(`Successfully generated ${name}!`);
console.log(`-> Machine path: src/machine-generated/${name}`);
console.log(`-> Next steps: Write to ${path.join(outDir, 'prompt.md')} to provide generation instructions to the AI.`);
