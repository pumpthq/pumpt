module.exports = {
  "verbose": true,
  //"automock": true,
  "moduleDirectories": ["node_modules", "src"],
  "testPathIgnorePatterns": ["<rootDir>/src/specs", "<rootDir>/node_modules/"],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "setupTestFrameworkScriptFile": "<rootDir>test/setup.js"
};
