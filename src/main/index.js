import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icoBiblia.png?asset'
import { Downloader } from 'ytdl-mp3'
import ytsr from 'ytsr'
// const ytsr = require('ytsr');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    // frame: false,

    // ...(process.platform === 'linux' ? { icon } : {}),
    icon,
    backgroundColor: '#95B3B7',
    opacity: 0.95,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', (event, arg) => {
    console.log(arg)
    // ipcMain.("back", "desde el back end")
    event.reply('back', 'desde el back-end')
  })

  ipcMain.on('descargarMp3', async (e, agr) => {
    const { buscar: stringBuscar } = agr
    const downloader = new Downloader({
      getTags: true
    })
    await downloader.downloadSong(stringBuscar)
    e.reply('respuesta', 'Se descargo el archivo')
  })

  // BUSCAR ALL MUSICAS

  ipcMain.on('BUSCAR', async (e, agr) => {
    const { buscar: stringBuscar } = agr

    const searchResults = await ytsr(stringBuscar)

    e.reply('RESPUESTA_BUSQUEDA', searchResults)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
