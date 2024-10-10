module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json", // Ensure ts-jest uses your tsconfig
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // 替換為你的來源檔案目錄
    "!src/**/*.d.ts", // 排除型別檔案
    "!src/**/*.test.{ts,tsx}", // 排除測試檔案
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/", // Ignore test files
    "/.next/", // Ignore built files
    "/public/", // Ignore public assets
    "<rootDir>/src/app/store/", 
  ],
  testPathIgnorePatterns: [
    "<rootDir>/src/app/store/", 
  ],
};
