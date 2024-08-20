const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Your entry point file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Regex for file types
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Handle images
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from 'dist'
    compress: true,
    port: 3000, // Port number
    hot: true, // Enable Hot Module Replacement
  },
  devtool: 'source-map', // Enable source maps for debugging
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
