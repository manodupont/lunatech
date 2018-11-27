const webpack = require('webpack');
const path = require('path');
// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AutoCleanBuildPlugin = require('webpack-auto-clean-build-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const JavaScriptObfuscator = require('webpack-obfuscator');
const dotenv = require('dotenv').config();
const BuildInfo = require('./tools/build-info');

const version = process.env.RELEASE_TAG || BuildInfo.releaseTag;

// Get environment variables to inject into our app.
const DEBUG = !process.argv.includes('--production') && process.env.NODE_ENV !== 'production';
const ANALYSER = process.argv.includes('--analyse');

const VERBOSE = process.argv.includes('--verbose');

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG
};

//
const config = {
  mode: DEBUG ? 'development' : 'production',

  context: path.resolve(__dirname, './src'),
  entry: {
    main: './index.js',
    vendors: ['react', 'react-redux', 'redux']
  },

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json', '.css', '.scss']
  },

  output: {
    path: path.resolve(__dirname, './build/public/assets'),
    publicPath: './assets/',
    sourcePrefix: '  ',
    filename: '[name].[hash].js',
  },

  target: 'web',

  stats: {
    // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
    all: undefined,

    // Add asset Information
    assets: true,

    // Sort assets by a field
    // You can reverse the sort with `!field`.
    assetsSort: "field",

    // Add build date and time information
    builtAt: false,

    // Add information about cached (not built) modules
    cached: false,

    // Show cached assets (setting this to `false` only shows emitted files)
    cachedAssets: false,

    // Add children information
    children: false,

    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,

    // Add namedChunkGroups information
    chunkGroups: false,

    // Add built modules information to chunk information
    chunkModules: false,

    // Add the origins of chunks and chunk merging info
    chunkOrigins: false,

    // Sort the chunks by a field
    // You can reverse the sort with `!field`. Default is `id`.
    chunksSort: "field",

    // `webpack --colors` equivalent
    colors: true,

    // Display the distance from the entry point for each module
    depth: false,

    // Display the entry points with the corresponding bundles
    entrypoints: false,

    // Add --env information
    env: false,

    // Add errors
    errors: true,

    // Add details to errors (like resolving log)
    errorDetails: true,

    // Add the hash of the compilation
    hash: false,

    // Set the maximum number of modules to be shown
    maxModules: 15,

    // Add built modules information
    modules: false,

    warnings: false,
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader?url=false", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader?url=false", // translates CSS into CommonJS
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader', /**/
        include: [
          path.resolve(__dirname, './src'),
        ],
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: [
            'transform-runtime',
            [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements',
              'transform-react-inline-elements',
            ],
          ],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
    ]
  },
  // devtool: 'source-map',
  plugins: [
    // webpack 3 scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      ...GLOBALS,
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
    //
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      disable: false,
      allChunks: true
    }),
    // Plugin to replace a standard webpack chunk hashing with custom (md5) one.
    new WebpackChunkHash({
      algorithm: 'md5'
    }),
    // save stats
    new AssetsWebpackPlugin({
      filename: 'build/public/webpack-assets.json'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },

    occurrenceOrder: DEBUG,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          mangle: false,
          beautify: DEBUG,
          minimize: !DEBUG,

          // Eliminate comments
          comments: false,

          // Compression specific options
          compress: {
            warnings: false,

            // Drop `console` statements
            drop_console: DEBUG
          }
        }
      })
    ]
  },
};

// DEV ONLY Configuration
// Add a bundle analyser viewer
if (ANALYSER) {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: true
  }));
}

if (!DEBUG) {
  console.log("Obfuscating ...");
  config.plugins.push(new JavaScriptObfuscator({
    rotateUnicodeArray: true
  }));
}

module.exports = config;

