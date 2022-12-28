const { app, BrowserWindow, dialog } = require('electron')
const path = require('path')
const { checkUpgrade } = require('./upgrade.js')
// 是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

dialog.showCertificateTrustDialog({
  certificate: {},
  message: 'xxxx'
})

app.on('ready', () => {
  const window = new BrowserWindow({
    width: 400,
    height: 300,
    // x: 0,
    // y: 0,
    center: !isDev,
    resizable: false,
    show: false,
    icon: isDev ? 'public/icon.ico': path.join(app.getAppPath(), 'build/icon.ico'),
    title: 'Front Proxy',
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: isDev,
      webSecurity: false
    }
  })

  window.loadURL(isDev ? process.env.DEV_SERVER_URL : `file://${path.join(app.getAppPath(), 'build/index.html')}`)
  window.openDevTools()
  window.once('ready-to-show', () => {
    window.show()
    setTimeout(checkUpgrade, 1000)
  })
})
