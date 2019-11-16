const { CheckerPlugin } = require("awesome-typescript-loader");
const { DefinePlugin, SourceMapDevToolPlugin, EvalSourceMapDevToolPlugin, HotModuleReplacementPlugin } = require("webpack");
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
  // Use faster minification for development
  const devtoolPlugin = environment === "development" ?
    new EvalSourceMapDevToolPlugin({
      exclude: /(vendor|polyfill)(.*)?.js/
    }) :
    new SourceMapDevToolPlugin({
      filename: "[name].map.js",
      exclude: /(vendor|polyfill)(.*)?.js/
    });

  // Entry
  const entry = [
    `${__dirname}/src/browser.tsx`,
    `${__dirname}/src/style/main.scss`
  ];
  if (environment === "development") {
    entry.unshift("webpack-hot-middleware/client")
  }

  // Plugins
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: "templates/index.hbs"
    }),
    new CheckerPlugin(),
    new DefinePlugin({
      // Put it under "global" so that it works both in NodeJS and in browsers (see index.d.ts)
      "global.DEBUG": JSON.stringify(environment === "development"),
      "global.BROWSER": true,
    }),
    new MiniCssExtractPlugin({
      filename: `[name]${environment === "development" ? "" : ".[contenthash]"}.css`,
      chunkFilename: `[name]${environment === "development" ? "" : ".[contenthash]"}.css`
    }),
    devtoolPlugin,
  ];
  if (environment === "development") {
    plugins.push(new HotModuleReplacementPlugin());
  }

  return {
    mode: environment,
    watch: environment === "development",
    entry,

    output: {
      path: `${__dirname}/dist`,
      publicPath: "dist/",
      // [contenthash] does not work on development mode, thus disable it (we don't really need it local anyways)
      filename: `[name]${environment === "development" ? "" : ".[hash]"}.js`,
      chunkFilename: `[name]${environment === "development" ? "" : ".[contenthash]"}.js`
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
      modules: [
        `${__dirname}/dist`,
        "node_modules"
      ],
      alias: {
        "~": `${__dirname}/src`,
        "react-dom": environment === "development" ? "@hot-loader/react-dom" : "react-dom"
      }
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "awesome-typescript-loader",
          options: {
            configFileName: "tsconfig.webpack.json",
            silent: environment === "production",
            babelOptions: {
              plugins: environment === "development" ? ["react-hot-loader/babel"] : [] // Else it polutes the prod build
            }
          }
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          options: {
            helperDirs: [`${__dirname}/templates/helpers`]
          }
        },
        {
          test: /\.css$/,
          loader: "style-loader"
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: environment === "development"
              }
            },
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
                sassOptions: {
                  importer: magicImporter(),
                  includePaths: [
                    `${__dirname}/src/style`
                  ],
                },
                sourceMap: environment === "development"
              }
            }
          ]
        },
      ]
    },

    optimization: {
      minimize: environment !== "development",
      splitChunks: {
        chunks: "async",
        minSize: 0,
        minChunks: Infinity,
        cacheGroups: {
          common: {
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
          three: {
            test: /[\\/]node_modules[\\/]three/ ,
            priority: 0,
            name: "three",
            chunks: "all",
            enforce: true
          },
          default: false
        }
      }
    },

    plugins,
  }
}