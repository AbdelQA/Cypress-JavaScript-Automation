const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dpju4p',
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://demo.realworld.io'
  },
});
