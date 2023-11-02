import {defineConfig} from 'father';

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
  prebundle: {
    deps: [
      'cac',
      'dotenv',
      'dotenv-expand'
    ]
  }
});
