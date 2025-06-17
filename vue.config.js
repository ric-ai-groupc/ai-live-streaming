const { defineConfig } = require('@vue/cli-service')
const path = require('path') // Add this line to import the path module
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_VS_API_BASE_URL, // 接口目标服务器地址
        changeOrigin: true,               // 是否更改请求头中的 origin
        pathRewrite: {
          '^/api': ''                     // 可选：去掉请求路径中的 /api 前缀
        }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
  
})
