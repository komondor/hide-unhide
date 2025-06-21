import type { CustomArgs, CustomOptions } from 'jsr:@ghostmind/run';
import { $ } from 'npm:zx@8.1.3';

export default async function (_args: CustomArgs, opts: CustomOptions) {
  $.verbose = true;

  console.log(
    '🚀 Building VS Code extension and generating VSIX for release...'
  );

  // Navigate to the app directory where the VS Code extension is located
  const appDir = `${opts.currentPath}/app`;
  const releasesDir = `${opts.currentPath}/releases`;

  try {
    // Create releases directory if it doesn't exist
    console.log('📁 Creating releases directory...');
    await $`mkdir -p ${releasesDir}`;

    // Build the extension using the existing package script
    console.log('📦 Building extension...');
    await $`cd ${appDir} && npm run package`;

    // Generate VSIX file using vsce and output to releases directory
    console.log('📋 Generating VSIX file in releases directory...');
    await $`cd ${appDir} && vsce package --out ${releasesDir}`;

    console.log('✅ VSIX file generated successfully in releases directory!');

    // List the generated VSIX file
    const vsixFiles = await $`ls -la ${releasesDir}/*.vsix`;
    console.log('📄 Generated VSIX file:');
    console.log(vsixFiles.stdout);

    console.log(`🎯 VSIX file is ready for GitHub release in: ${releasesDir}`);
  } catch (error) {
    console.error('❌ Error building extension or generating VSIX:', error);
    throw error;
  }
}
