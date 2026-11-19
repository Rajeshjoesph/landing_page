// webpack.config.js
module.exports = {
  // ...existing configuration...
  devtool: "source-map",
  ignoreWarnings: [
    {
      message: /Failed to parse source map/,
    },
  ],
};
