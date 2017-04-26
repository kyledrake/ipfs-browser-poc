var {ipcRenderer, remote} = require('electron')

document.querySelectorAll('.url-bar form')[0].addEventListener('submit', (evt) => {
  evt.preventDefault()
  const webview = document.querySelector('webview')
  let url = document.querySelectorAll('.address-bar input')[0].value

  let ipfsmatch = url.match(/^ipfs:\/\/(.+)/)
  let ipnsmatch = url.match(/^ipns:\/\/(.+)/)

  if(ipfsmatch) {
    console.log('send request: ', ipfsmatch[1])
    webview.send('request', ipfsmatch[1])
  } else if(ipnsmatch) {
    webview.send('ipnsRequest', ipnsmatch[1])
  } else {
    webview.src = 'http://' + document.querySelectorAll('.address-bar input')[0].value
  }

  return false
})

function updateWebview() {
  let webview = document.querySelector("webview")
  webview.style.height = document.documentElement.clientHeight + "px"
  webview.style.width = document.documentElement.clientWidth + "px"
}

onload = updateWebview
window.onresize = updateWebview
