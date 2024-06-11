const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      // Define entry points for different JavaScript files
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      // Configure output file names and directory
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files and inject bundles
      new HtmlWebpackPlugin({
        template: './index.html', // Specify the template HTML file
        title: 'JATE' // Set the title of the HTML document
      }),
      // Inject custom service worker into the bundle
      new InjectManifest({
        swSrc: './src-sw.js', // Specify the path to the service worker source file
        swDest: 'src-sw.js', // Specify the destination for the injected service worker
      }),
      // Generate a manifest.json file for PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          // Define icons and their sizes for the PWA
          {
            src: path.resolve('src/images/logo.png'), // Specify the path to the icon image
            sizes: [96, 128, 192, 256, 384, 512], // Specify different sizes for the icon
            destination: path.join('assets', 'icons'), // Specify the destination directory for icons
          },
        ],
      }),
    ],

    module: {
      // Define module rules for handling different file types
      rules: [
        // CSS Loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // JavaScript Loaders (using Babel)
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
