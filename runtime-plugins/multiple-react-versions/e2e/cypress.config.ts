import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: './e2e/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
});
