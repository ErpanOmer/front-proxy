module.exports = {
  appId: 'com.balqish.www',
  productName: 'Proxy Tool',
  copyright: 'Copyright@2020 Balqish Rights Reserved',
  artifactName: '${productName}_${arch}_v${version}.${ext}',
  buildVersion: '1.0.0',
  compression: 'store',
  directories: {
    output: 'package'
  },
  win: {
    target: 'nsis'
    // icon: 'xxx/icon.ico' //图标路径
  }
  // nsis: {
  //   oneClick: true, // 一键安装
  //   perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
  //   allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
  //   installerIcon: './build/icons/aaa.ico', // 安装图标
  //   uninstallerIcon: './build/icons/bbb.ico', //卸载图标
  //   installerHeaderIcon: './build/icons/aaa.ico', // 安装时头部图标
  //   createDesktopShortcut: true, // 创建桌面图标
  //   createStartMenuShortcut: true, // 创建开始菜单图标
  //   shortcutName: 'Proxy Tool' // 图标名称
  // }
}
