module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(avi|mp4)$/i,
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
