let proxyObj = {};
proxyObj['/ws'] = {
  ws: false,
  target: "ws://localhost:15005"
};
proxyObj['/'] = {
  ws: false,
  target: "http://localhost:15005",
  changeOrigin: true,
  pathRewrite: {
    '^/':''
  }
}
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
})
