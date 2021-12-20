module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(avi)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'video',
            name: '[name].[contenthash].[ext]',
          },
        },
      ],
    },
  },
};
