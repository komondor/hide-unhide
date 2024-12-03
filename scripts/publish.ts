import type { CustomArgs, CustomOptions } from 'jsr:@ghostmind/run';
import { $, cd } from 'npm:zx@8.1.3';

// need to login first with vsce login publisher_id

export default async function (_arg: CustomArgs, opts: CustomOptions) {
  const { currentPath, env } = opts;

  $.verbose = true;

  const PUBLISHER_ID = env['PUBLISHER_ID'];

  cd(`${currentPath}/app`);

  await $`npm run package`;

  await $`vsce publish`;
}
