'use strict'

const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const IPFS = require('ipfs')
const through = require('through2')
const ipfs = new IPFS()

let win

function createWindow () {
  win = new BrowserWindow({width: 1280, height: 960})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('get', (event, hash) => {
  event.sender.send('start')
  console.log(hash)
  ipfs.files.cat(hash, (err, stream) => {
    stream.on('data', function(data) {
      event.sender.send('load', new Buffer(data, 'binary').toString('hex'))
    })
    stream.on('end', function() {
      event.sender.send('end')
    })
  })
})

ipfs.on('ready', () => {
  console.log('IPFS is ready!')
})
