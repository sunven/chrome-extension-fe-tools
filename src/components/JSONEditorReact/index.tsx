import JSONEditor from "jsoneditor"

import "jsoneditor/dist/jsoneditor.css"

import React, { useEffect, useRef, useState } from "react"

export default function JSONEditorReact(props) {
  const { text, ...reset } = props
  const ref = useRef<HTMLDivElement>(null)
  const [jsonEditor, setJsonEditor] = useState<JSONEditor | null>(null)
  useEffect(() => {
    if (ref.current) {
      const editor = new JSONEditor(ref.current, reset)
      setJsonEditor(editor)
    }
  }, [])
  useEffect(() => {
    jsonEditor?.setText(text)
  }, [text])
  return <div className="jsoneditor-react-container" ref={ref} />
}
