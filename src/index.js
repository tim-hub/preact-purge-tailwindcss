const notFoundError = name => `Please pass the ${name} parameter to plugin`;

const defaultParams = {
  regex: /[\w-/:]+(?<!:)/g,
};

module.exports = (config, env, helpers, params = defaultParams) => {
  if (!config) throw new Error(notFoundError("config"));
  if (!env) throw new Error(notFoundError("env"));
  if (!helpers) throw new Error(notFoundError("helpers"));

  const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all of the template files in your project
    content: [
      "./src/**/*.tsx",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(params.regex) || [],
  });

  const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader");
  postCssLoaders.forEach(({ loader }) => {
    const plugins = loader.options.postcssOptions.plugins;

    // Add tailwind css at the top.
    plugins.unshift(require("tailwindcss"));

    // Add PurgeCSS only in production.
    if (env.production) {
      plugins.push(purgecss);
    }
  });
  return config;
};
