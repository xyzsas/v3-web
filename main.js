const { app, BrowserWindow, screen, nativeTheme } = require('electron')
const path = require('path')
function createWindow () {
  nativeTheme.themeSource = 'light'
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width, height,
    icon: path.join(__dirname, './dist/favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('./dist/index.html')
}
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
   }
})