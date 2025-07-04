import type { CustomArgs, CustomOptions } from 'jsr:@ghostmind/run';
import { $ } from 'npm:zx@8.1.3';

export default async function (_arg: CustomArgs, opts: CustomOptions) {
  $.verbose = true;

  await $`mkdir -p ~/test-workspace/.vscode`;

  await $`cp .vscode/settings.json ~/test-workspace/.vscode`;
  await $`cp .gitignore  ~/test-workspace/`;
  await $`cp meta.json ~/test-workspace/`;
}
