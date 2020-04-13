module.exports = function(config) {
  config.module.rules.push(
    {
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
    },
  );
  return config;
};
