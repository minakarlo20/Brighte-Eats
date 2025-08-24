const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  rootDir: "src",                        // look for tests inside /src
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testRegex: ".*\\.spec\\.ts$",          // only run files ending with .spec.ts
  collectCoverageFrom: ["**/*.(t|j)s"],  // measure test coverage
  coverageDirectory: "../coverage",
  verbose: true,
};