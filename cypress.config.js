const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dpju4p',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
