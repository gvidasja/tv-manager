const electron = require('electron')
const isDev = require('electron-is-dev')
const { join } = require('path')

const { app, BrowserWindow } = electron

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600 })

  !isDev && mainWindow.setMenu(null)

  mainWindow.setTitle('Tv Manager')
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => mainWindow = mainWindow || createWindow())