const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// module.exports = {
// 	// ... other Webpack configuration options
// 	module: {
// 		rules: [
// 			// Add this rule
// 			{
// 				test: /\.jsx?$/, // Matches both .js and .jsx files
// 				exclude: /node_modules/, // Exclude node_modules folder
// 				use: {
// 					loader: "babel-loader",
// 					options: {
// 						presets: ["@babel/preset-react"], // Enable React preset
// 					},
// 				},
// 			},

// 			{
// 				test: /\.css$/,
// 				use: ["style-loader", "css-loader"],
// 			},
// 		],
// 	},
// 	plugins: [
// 		// Configure NodePolyfillPlugin to include only the necessary modules
// 		new NodePolyfillPlugin("path", "os", "crypto", "stream"),
// 	],
// };

module.exports = {
  // ... other configuration
  	module: {
		rules: [
			// Add this rule
			{
				test: /\.jsx?$/, // Matches both .js and .jsx files
				exclude: /node_modules/, // Exclude node_modules folder
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react"], // Enable React preset
					},
				},
			},

			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify")
    }
  },
  // ... other configuration
};
