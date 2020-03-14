# Preact CLI Tailwind CSS Plugin

This is for using Typescript, Tailwind Css, Purgecss together with Preact.

- Significantly reduce your size of your bundled CSS (**from about 700kb to 1~10kb**)
- Preact Typescript template is required
- Remove unused css for all components, (js, ts, tsx, jsx)
- Keep the dependency updated

## Usage

```bash
npm i preact-purge-tailwindcss --save-dev

# OR

yarn add preact-purge-tailwindcss --dev
```

In your `preact.config.js`:

```js
import tailwind from "preact-purge-tailwindcss";

module.exports = (config, env, helpers) => {
  config = tailwind(config, env, helpers);
  return config;
};
```

## API

Pass in `config`, `env` and `helpers` as forwarded from config.

It also exposes a fourth argument `params` which allows you to [customise the regex](https://tailwindcss.com/docs/controlling-file-size#understanding-the-regex) provided to Purge CSS.

```js
import tailwind from "preact-purge-tailwindcss";

module.exports = (config, env, helpers) => {
  config = tailwind(config, env, helpers, {
    regex: /[\w-/:%]+(?<!:)/g,
  });
  return config;
};
```

## Reference

- [folk from](https://github.com/agneym/preact-cli-tailwind)
