module.exports = {
  "moduleFileExtensions": [
    "js",
    "jsx",
    "json"
  ],
  "transformIgnorePatterns": [
    "/node_modules/",
    ".history/*"
  ],
  "modulePathIgnorePatterns": [
    "/.history/"
  ],
  "moduleDirectories": [
    "node_modules",
    ".",
    "src",
    "src/shared"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/__tests__/setup.js",
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ],
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__tests__/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__tests__/__mocks__/styleMock.js"
  },
  "testEnvironment": "<rootDir>/__tests__/__mocks__/jsdomMock.js"
};
