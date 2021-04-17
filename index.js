const https = require('https');

class WebpackBuildAnalytic {
  constructor(options = {}) {
    this.options = {
      ...options
    };
  }

  apply(compiler) {
    const done = (stats, callback) => {
      callback = callback || (() => {});

      const actions = [];

      actions.push(() => this.generateReport(stats.toJson()));

      if (actions.length) {
        setImmediate(async () => {
          try {
            await Promise.all(actions.map(action => action()));
            callback();
          } catch (e) {
            callback(e);
          }
        });
      } else {
        callback();
      }
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap('webpack-build-analytic', done);
    } else {
      compiler.plugin('done', done);
    }
  }

  async generateReport(stats) {

    try {
      const parse = this.parse(stats);

      const data = JSON.stringify({
        apiKey: this.options.apiKey,
        type: 'webpack',
        data: parse,
        version: this.options.version,
        size: parse.size
      });
      
      const options = {
        hostname: 'buildanalytics.codeartonline.com',
        port: 443,
        path: '/api/build',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }

      const req = https.request(options, res => {
        res.on('data', d => {
          
        })
      })
      
      req.on('error', error => {
        console.error('failed send stats ', error)
      })
      
      req.write(data);
      req.end();
    } catch (error) {
      console.log(errory);
    }
  }

  parse(stats, options = {}) {
    stats.assets = stats.assets.filter(asset => {
      // Filter out source maps by testing for file name ending with .map
      if (options.excludeSourceMaps) return !/\.map$/.test(asset.name);
      return true;
    });
  
    return {
      timeStamp: Date.now(),
      time: stats.time,
      hash: stats.hash,
      outputPath: stats.outputPath,
      publicPath: stats.publicPath,
      version: stats.version,

      errors: stats.errors,
  
      size: stats.assets.reduce((totalSize, asset) => totalSize + asset.size, 0),
  
      assets: stats.assets.map(asset => ({
        name: asset.name,
        chunks: asset.chunks,
        size: asset.size
      })),
  
      chunks: stats.chunks.map(chunk => ({
        size: chunk.size,
        files: chunk.files,
        modules: chunk.modules
          ? chunk.modules.map(module => ({
              name: module.name,
              size: module.size,
              id: module.id
            }))
          : []
      }))
    };
  }
}

module.exports = WebpackBuildAnalytic;