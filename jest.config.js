module.exports = {
  rootDir: ".",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [["next/babel", { "preset-react": { runtime: "automatic" } }]],
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(next-intl)/)",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}",
    "<rootDir>/src/**/?(*.)+(spec|test).{ts,tsx}",
  ],
};
