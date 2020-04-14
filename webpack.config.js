const CompressionPlugin = require("compression-webpack-plugin");

module.exports = function(config) {
  config.module.rules = [...config.module.rules, {
    test: /\.scss$/,
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      syntax: "postcss-scss",
      plugins: () => [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  }];
  config.plugins = [...config.plugins,
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ];
  return config;
};
