const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dpju4p',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
