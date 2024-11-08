import { basicSetup, EditorView } from "codemirror"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { json } from "@codemirror/lang-json"
import { StateField } from "@codemirror/state"

export default function CodeMirror({ text, onTextChange, className }) {
  const ref = useRef<HTMLDivElement>()
  const [editorView, setEditorView] = useState<EditorView>(null)

  const listenChangesExtension = useMemo(() => {
    // https://github.com/codemirror/dev/issues/44#issuecomment-789093799
    return StateField.define({
      // we won't use the actual StateField value, null or undefined is fine
      create: () => null,
      update: (value, transaction) => {
        if (transaction.docChanged) {
          // access new content via the Transaction
          const newText = transaction.newDoc.toString()
          console.log("update", value, newText)
          if (text === newText) {
            return
          }
          onTextChange(newText)
        }
        return
      }
    })
  }, [])

  /**
   * resetDoc
   * @param text
   * https://discuss.codemirror.net/t/how-to-set-new-doc-content/5156
   */
  const resetDoc = useCallback(
    (text) => {
      editorView?.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: text
        }
      })
    },
    [editorView]
  )

  useEffect(() => {
    if (!editorView) {
      let editorView = new EditorView({
        doc: text,
        extensions: [basicSetup, json(), listenChangesExtension],
        parent: ref.current
      })
      setEditorView(editorView)
    }

    return () => {
      editorView?.destroy()
    }
  }, [])

  useEffect(() => {
    resetDoc(text)
  }, [text])
  return (
    <div
      className={className}
      ref={ref}
      onClick={() => {
        // https://discuss.codemirror.net/t/code-mirror-6-has-focus-what-about-blur/4071
        editorView.contentDOM.focus()
      }}></div>
  )
}
