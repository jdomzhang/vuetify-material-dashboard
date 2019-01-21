module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:9090/',
        secure: false,
        changeOrigin: true
      },
      '/userdata/*': {
        target: 'http://localhost:9090/',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
