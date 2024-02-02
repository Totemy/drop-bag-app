const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "timers": require.resolve("timers-browserify")
      }
    }
  },
  devServer: {
    proxy: {
      '/novaposhta-api': {
        target: 'https://api.novaposhta.ua/v2.0/json/',
        changeOrigin: true,
        pathRewrite: { '^/novaposhta-api': '' },
      },
    },
  },
})
