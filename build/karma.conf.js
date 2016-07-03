import { argv } from 'yargs'
import config from '../config'
import webpackConfig from './webpack.config'
<<<<<<< HEAD
import _debug from 'debug'

const debug = _debug('app:karma')
=======

const debug = require('debug')('app:karma')
>>>>>>> origin/master
debug('Create configuration.')

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
<<<<<<< HEAD
=======
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
>>>>>>> origin/master
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
<<<<<<< HEAD
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack']
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js'
      }
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: {
      ...webpackConfig.externals,
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
=======
  frameworks: ['mocha', 'chai-sinon', 'chai-as-promised', 'chai'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['spec'],
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      loaders: webpackConfig.module.loaders
>>>>>>> origin/master
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

<<<<<<< HEAD
if (config.globals.__COVERAGE__) {
=======
if (config.coverage_enabled) {
>>>>>>> origin/master
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta',
    exclude: /node_modules/
  }]
}

<<<<<<< HEAD
// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig)
=======
export default (cfg) => cfg.set(karmaConfig)
>>>>>>> origin/master
