module.exports = {
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/(?!@babel).+\\.js$"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  verbose: true
};
