const { app, BrowserWindow } = require('electron')
const path = require('path')
// 是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

app.on('ready', () => {
  const window = new BrowserWindow({
    width: 400,
    height: 300,
    // x: 0,
    // y: 0,
    center: !isDev,
    resizable: false,
    show: false,
    icon: isDev ? 'public/icon.ico' : path.join(__dirname, '/icon.ico'),
    title: 'Front Proxy',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: !isDev,
      webSecurity: false
    }
  })

  window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '/index.html')}`)
  window.openDevTools()
  window.once('ready-to-show', () => {
    window.show()
  })
})
