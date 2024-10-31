import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"

import "./json.css"

import * as monaco from "monaco-editor"
import { useEffect, useRef, useState } from "react"

self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    const getWorkerModule = (moduleUrl, label) => {
      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
        name: label,
        type: "module"
      })
    }

    switch (label) {
      case "json":
        return getWorkerModule(
          "/monaco-editor/esm/vs/language/json/json.worker?worker",
          label
        )
      default:
        return getWorkerModule(
          "/monaco-editor/esm/vs/editor/editor.worker?worker",
          label
        )
    }
  }
}

export default function Json() {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoEl = useRef(null)

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor

        const a = {
          string: "Hello, World!",
          number: 42,
          array: ["apple", "banana"],
          object: {
            name: "John Doe",
            courses: [
              {
                courseName: "Mathematics",
                credits: 3
              }
            ]
          }
        }
        const newEditor = monaco.editor.create(monacoEl.current!, {
          value: JSON.stringify(a, null, "\t"),
          language: "json"
        })

        // 添加内容变化监听器

        return newEditor
      })
    }

    return () => editor?.dispose()
  }, [monacoEl.current])
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full rounded-lg border">
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="h-full w-full" ref={monacoEl}></div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
