const { override, overrideDevServer, addWebpackAlias, setWebpackTarget } = require('customize-cra')
const path = require('path')

// 自定义webpack配置
const addCustomize = config => {
  config.output.publicPath = './'
  return config
}

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    setWebpackTarget('electron-renderer'),
    addCustomize
  ),
  devServer: overrideDevServer()
}
