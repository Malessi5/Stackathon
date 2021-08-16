module.exports = {
  entry: ["./client/app.js"],

  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  mode: "development",
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
