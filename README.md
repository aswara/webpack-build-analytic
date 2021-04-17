

# Webpack Build Analytic

Webpack Monitor is a configurable Webpack plugin that captures relevant statistics on your production builds, and an interactive analysis tool that helps developers better understand bundle composition and identify and prioritize optimization strategies.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

## Usage


Install the webpack monitor plugin on your production config. The plugin will collect stats whenever meaningful changes to bundle composition have occurred. Optionally launch analysis too to see how your bundles have changed over time!

## Setup
```sh
npm install --save-dev webpack-build-analytic
```

in `webpack.config.js`
```js
const WebpackBuildAnalytic = require('webpack-build-analytic');

// ...

plugins: [
  new WebpackBuildAnalytic({
    apiKey: "",
    version: ""
  }),
],
```

- `apiKey` your apiKey project.  
- `version` version your app. 
- `excludeSourceMaps` excludes emitted source maps from the build stats.

## Contributing
To contribute to `webpack-build-analytic`, fork the repository and clone it to your machine then install dependencies with `npm install`. If you're interested in joining the Webpack Build Analytic team as a contributor, feel free to message one of us directly!

## Authors

- Adi Aswara (https://github.com/aswara)

## License

This project is licensed under the MIT License - see the LICENSE file for details

[downloads-image]: https://img.shields.io/npm/dt/webpack-build-analytic.svg
[npm-url]: https://www.npmjs.com/package/webpack-build-analytic
[npm-image]: https://img.shields.io/npm/v/webpack-build-analytic.svg