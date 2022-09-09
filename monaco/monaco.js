/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-taubyte'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor'
import axios from "axios";

// @ts-ignore
window.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return '/monaco/dist/json.worker.bundle.js'
    }
    if (label === 'css') {
      return '/monaco/dist/css.worker.bundle.js'
    }
    if (label === 'html') {
      return '/monaco/dist/html.worker.bundle.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return '/monaco/dist/ts.worker.bundle.js'
    }
    return '/monaco/dist/editor.worker.bundle.js'
  }
}

window.addEventListener('load', async () => {
  const ydoc = new Y.Doc()

  const roomInput = /** @type {HTMLElement} */document.getElementById("socket-room")
  roomInput.value = window.localStorage.getItem("socket-room")

  let host = window.location.origin
  let response = await axios.get(host + "/ws/url").catch((e) => {
    let errorHeader = /** @type {HTMLElement} */document.getElementsByClassName('error-header')[0]
    errorHeader.style.setProperty("display", "block")
    errorHeader.innerHTML = `Getting websocket url failed with:${e}`
  })
  let wsURL = host.replace("http", "ws") + "/" + response.data
  const provider = new WebsocketProvider(wsURL, ydoc, { room: roomInput.value })
  const ytext = ydoc.getText('monaco')

  const editor = monaco.editor.create(/** @type {HTMLElement} */(document.getElementById('monaco-editor')), {
    value: '',
    language: 'javascript',
    theme: 'vs-dark'
  })
  const monacoBinding = new MonacoBinding(ytext, /** @type {monaco.editor.ITextModel} */(editor.getModel()), new Set([editor]), provider.awareness)

  const connectBtn = /** @type {HTMLElement} */ (document.getElementById('y-connect-btn'))
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  const joinRoomBtn = /** @type {HTMLElement} */ (document.getElementById('y-room-btn'))
  joinRoomBtn.addEventListener('click', () => {
    window.localStorage.setItem("socket-room", roomInput.value)
    provider.disconnect()
    provider.setRoom(roomInput.value)
    provider.connect()
    roomInput.value = ""
  })

  // @ts-ignore
  window.example = { provider, ydoc, ytext, monacoBinding }
})
