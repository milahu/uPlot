// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,
  "reporters": [
    "default",
    "<rootDir>/jest-helpers/save-actual-snapshot-reporter.js",
  ],

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,
  rootDir: "test",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [
    "jest-canvas-mock",
  ],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: [
    "<rootDir>/jest-helpers/snapshot-to-json-serializer.js",
  ],
};
