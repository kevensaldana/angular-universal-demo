const CompressionPlugin = require("compression-webpack-plugin");
const {InjectManifest} = require("workbox-webpack-plugin");
const swFile = "sw.js";

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
  config.plugins = [ ...config.plugins,
    new InjectManifest({
      swSrc: "./src/service-worker.js",
      swDest: "sw.js",
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      dontCacheBustURLsMatching: new RegExp(".+.[a-f0-9]{20}..+"),
      additionalManifestEntries: [{
        url: "index.html", revision: new Date().toString(),
      }]
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      cache: false,
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8,
      exclude: [swFile],
    }),
    new CompressionPlugin({
      filename: "[path].br[query]",
      cache: false,
      algorithm: "brotliCompress",
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      exclude: [swFile],
    }),
  ];
  return config;
};
