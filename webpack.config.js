const path = require("path");
module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "web-prod.js",
    path: path.resolve(__dirname, "web-dist"),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
    ],
  },
  resolve:{
    extensions: [".ts", ".js]"]
  }

};
