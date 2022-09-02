import { keymap } from 'prosemirror-keymap'
import { Extension } from 'tiptap'
import { redo, undo, yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'

let wsData = {
  type: undefined,
  provider: undefined
}

export {wsData}

export default class RealtimeExtension extends Extension {
  get name () {
    return 'realtime'
  }

  get plugins () {
    return [
      ySyncPlugin(wsData.type),
      yCursorPlugin(wsData.provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo
      })
    ]
  }
}