module.exports = {
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9090/mall',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
