
<script>
import axios from "axios";
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import loader from "@monaco-editor/loader";


export default {
  data() {
    return {
      wsProvider: undefined,
      doc: undefined,
      monaco: undefined,
      update: false
    }
  },
  async mounted() {
    let host = "http://hal.computers.com:9090/"
    let response = await axios.get(host + "ws/url")

    let wsUrl = response.data
    let doc = new Y.Doc()
    wsUrl = (host.replace("http", "ws") + wsUrl).slice(0, -11)

    this.wsProvider = new WebsocketProvider(wsUrl, 'someChannel', doc)
    this.docArray = doc.getText("text")

    doc.on('update', (update) => {
      Y.applyUpdate(doc, update)
      this.update = true
      this.doc = this.docArray
    })


    loader.init().then((monaco) => {
      this.monaco = monaco
      monaco.editor.create(document.getElementById("editor"));
      let models = monaco.editor.getModels()
      for (let m of models) {
        m.onDidChangeContent(() => {
          this.doc = m.getValue()
        })
      }
    });

  },
  methods: {
    edit() {
      console.log(this.docArray)
    },
  },
  watch: {
    doc(v) {
      if (this.update == false) {
        console.log("INSERT")
        this.docArray.insert(0, v)
      }
      this.update = false
    }
  }
}
</script>

<template>
  <div>
    <div id="editor" style="width: 500px; height: 500px"></div>
    <button @click="edit">
      HELLO
    </button>
  </div>
</template>


<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>

