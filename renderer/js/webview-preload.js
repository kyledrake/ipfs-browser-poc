const {ipcRenderer} = require('electron')

let buffer = ''

ipcRenderer.on('start', (event, data) => {
  //document.open()
})

ipcRenderer.on('load', (event, data) => {
  buffer = buffer + data
})

ipcRenderer.on('end', (event, data) => {
  document.body.innerHTML = Buffer.from(buffer, 'hex').toString('utf8')

  /*
  Example way to do image:
  File type can be detected using something like the file-type npm nodule.
  let img = document.createElement('img')
  img.setAttribute('src', 'data:image/png;base64,' + Buffer.from(buffer, 'hex').toString('base64'))
  document.body.appendChild(img)
  */

  //document.close()
})

ipcRenderer.on('request', (event, hash) => {
  ipcRenderer.send('get', hash)
})

ipcRenderer.on('ipnsRequest', (event, ipns) => {
  console.log('TODO')
})
