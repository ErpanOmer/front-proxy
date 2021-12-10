/* eslint-disable no-template-curly-in-string */
const { copySync, moveSync, emptydirSync } = require('fs-extra')
const deploy= require('./deploy.js')

// before build
// clean
emptydirSync('package')
emptydirSync('electron-build')
// copy
copySync('main.js', 'build/electron.js')
// move
moveSync('build', 'app/build', { overwrite: true })

// 构建完成后部署
const afterAllArtifactBuild = context => {
  setTimeout(deploy, 1000, context)
}

module.exports = {
  appId: 'com.balqish.www',
  productName: 'Front Proxy',
  copyright: 'Copyright@2022 Balqish Rights Reserved',
  artifactName: '${name}-${os}-${arch}.${ext}',
  compression: 'store',
  asar: false,
  directories: {
    output: 'electron-build'
  },
  afterAllArtifactBuild,
  win: {
    target: [
      {
        target: 'nsis',
        arch: [
          'x64',
          'ia32'
        ]
      }
    ],
    icon: 'public/icon.ico',
  },
  nsis: {
    oneClick: true, // 一键安装
    perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    installerIcon: 'public/icon.ico', // 安装图标
    uninstallerIcon: 'public/icon.ico', //卸载图标
    installerHeaderIcon: 'public/icon.ico', // 安装时头部图标
    createDesktopShortcut: true, // 创建桌面图标
    createStartMenuShortcut: true, // 创建开始菜单图标
    shortcutName: 'Front Proxy' // 图标名称
  }
}
