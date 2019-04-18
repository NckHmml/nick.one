const { CheckerPlugin } = require("awesome-typescript-loader");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const magicImporter = require("node-sass-magic-importer");

/**
 * Generates the webpack config
 * @param {string} environment environment to be build for, can be either development or production
 */ 
module.exports = (environment) => {
  return {
    mode: environment,
    watch: environment === "development",
    entry: [
      `${__dirname}/src/browser.tsx`,
      `${__dirname}/src/style/main.scss`,
    ],
    
    output: {
      path: `${__dirname}/dist`,
      publicPath: "dist",
      // [contenthash] does not work on development mode, thus disable it (we don't really need it local anyways)
      filename: `[name]${environment === "development" ? "" : ".[contenthash]"}.js`, 
      chunkFilename: `[name]${environment === "development" ? "" : ".[contenthash]"}.js`
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
      modules: [
        `${__dirname}/dist`,
        "node_modules"
      ],
      alias: {
        "~": `${__dirname}/src`
      }
    },

    // Use faster minification for development
    devtool: environment === "development" ? "eval-source-map" : "source-map",

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "awesome-typescript-loader"
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          options: {
            helperDirs: [`${__dirname}/templates/helpers`]
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false
              }
            }, {
              loader: "postcss-loader",
              options: {
                plugins: [cssnano(), autoprefixer()]
              }
            }, {
              loader: "sass-loader",
              options: {
                importer: magicImporter(),
                includePaths: [
                  `${__dirname}/src/style`
                ],
                sourceMap: environment === "local"
              }
            }
          ]
        },
      ]
    },

    optimization: {
      minimize: environment !== "local",
      splitChunks: {
        chunks: "async",
        minSize: 0,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            priority: -20,
            name: "vendor",
            chunks: "all",
            enforce: true
          },
          polyfill: {
            test: /[\\/](core-js|@?babel)/,
            priority: -10,
            name: "polyfill",
            chunks: "all",
            enforce: true
          },
          default: false
        }
      }
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: "templates/index.hbs"
      }),
      new CheckerPlugin(),
      new DefinePlugin({
        "DEBUG": JSON.stringify(environment !== "production"),
        "BROWSER": true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[contenthash].css"
      }),
    ]
  }
}