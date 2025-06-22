import type { CustomArgs, CustomOptions } from 'jsr:@ghostmind/run';
import { $ } from 'npm:zx@8.1.3';

export default async function (_args: CustomArgs, opts: CustomOptions) {
  const { env } = opts;

  // Get credentials from environment variables
  const publisherId = env['PUBLISHER_ID'];
  const azureToken = env['AZURE_TOKEN'];

  if (!publisherId || !azureToken) {
    throw new Error(
      'PUBLISHER_ID and AZURE_TOKEN environment variables are required'
    );
  }

  const credentials = {
    publishers: [
      {
        name: publisherId,
        pat: azureToken,
      },
    ],
  };

  // Get home directory and create .vsce file
  const homeDir = env['HOME'] || env['USERPROFILE'];
  if (!homeDir) {
    throw new Error('Unable to determine home directory');
  }

  const vsceConfigPath = `${homeDir}/.vsce`;

  try {
    // Write credentials to ~/.vsce file
    await Deno.writeTextFile(
      vsceConfigPath,
      JSON.stringify(credentials, null, 2)
    );
    console.log(
      `✅ Successfully created vsce credentials file at: ${vsceConfigPath}`
    );
    console.log(`📝 Publisher: ${publisherId}`);
    console.log('🔐 Azure DevOps PAT configured');
  } catch (error) {
    throw new Error(
      `Failed to write vsce credentials: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
