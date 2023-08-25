import { appTools } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
module.exports = {
  runtime: {
    router: true,
  },
  plugins: [appTools()],
};
