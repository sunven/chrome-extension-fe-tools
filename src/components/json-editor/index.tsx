import JSONEditor from "jsoneditor"

import "jsoneditor/dist/jsoneditor.css"

import React, { useEffect, useRef, useState } from "react"

import "./index.less"

export default function JSONEditorReact(props) {
  const { text, ...reset } = props
  const ref = useRef<HTMLDivElement>(null)
  const [jsonEditor, setJsonEditor] = useState<JSONEditor | null>(null)
  useEffect(() => {
    if (!jsonEditor) {
      const jsonEditor = new JSONEditor(ref.current, reset)
      setJsonEditor(jsonEditor)
    }
  }, [])
  useEffect(() => {
    try {
      jsonEditor?.setText(text)
    } catch (error) {
      console.error(error)
    }
  }, [text])
  return <div className="jsoneditor-wrapper" ref={ref} />
}
