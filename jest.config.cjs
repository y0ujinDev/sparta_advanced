module.exports = {
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@babel).+\\.js$"],
  verbose: true,
};
