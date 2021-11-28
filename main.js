const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const window = new BrowserWindow({
    width: 400,
    height: 300,
    // x: 0,
    // y: 0,
    center: process.env.NODE_ENV !== 'development',
    resizable: false,
    show: false,
    title: 'Proxy Tool',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV === 'development',
      webSecurity: false
    }
  })

  window.loadURL(`file://${__dirname}/render/render.html`)
  window.openDevTools()
  window.once('ready-to-show', () => {
    window.show()
  })
})