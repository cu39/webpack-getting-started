module.exports = {
  entry: "./app/app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
        { test: /\.css$/, loader: "style!css" }
      , { test: /\.less$/, loader: "style!css!less" }
      , { test: /\.sass$/, loader: "style!css!sass?indentedSyntax" }
      , { test: /\.scss$/, loader: "style!css!sass" }
    ]
  }
};
