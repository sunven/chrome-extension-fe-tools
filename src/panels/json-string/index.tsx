import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import "./index.less"

import JSONEditorReact from "@/components/json-editor"

const isJsonString = (str: string): boolean | any => {
  // 1. 首先进行快速的首尾检查
  str = str.trim()
  if (
    !(
      (str.startsWith("{") && str.endsWith("}")) ||
      (str.startsWith("[") && str.endsWith("]"))
    )
  ) {
    return false
  }

  // 2. 如果字符串较短，使用 JSON.parse
  if (str.length < 100000) {
    try {
      return JSON.parse(str)
    } catch {
      return false
    }
  }

  // 3. 对于长字符串，使用正则表达式检查
  return /^[\],:{}\s]*$/.test(
    str
      .replace(/\\["\\\/bfnrtu]/g, "@")
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        "]"
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  )
}

function transformJsonStringToJson<T>(data: T): T {
  // 处理数组
  if (Array.isArray(data)) {
    return data.map((item) => transformJsonStringToJson(item)) as T
  }

  // 处理对象
  if (data && typeof data === "object") {
    const result = { ...data }
    for (const key in result) {
      const newKey = "#" + key
      const value = result[key]
      if (typeof value === "string") {
        const jsonValue = isJsonString(value)
        if (jsonValue) {
          result[key] = transformJsonStringToJson(jsonValue)
        }
      } else if (value && typeof value === "object") {
        result[key] = transformJsonStringToJson(value)
      }
    }
    return result as T
  }

  return data
}

function unescapeNestedJson(escapedString) {
  // Handle multiple levels of escaping
  let result = escapedString
  while (result.includes('\\"') || result.includes("\\\\")) {
    result = result.replace(/\\"/g, '"').replace(/\\\\/g, "\\")
  }
  result = result.replace(/"{/g, "{")
  result = result.replace(/}"/g, "}")
  result = result.replace(/"\[/g, "[")
  result = result.replace(/]"/g, "]")
  return result
}

function JsonString() {
  const [text, setText] = useState("")
  const [requestData, setRequestData] = useStorage(
    {
      key: "requestData",
      instance: new Storage({
        area: "local"
      })
    },
    []
  )
  console.log("requestData", requestData)
  // const [requestDataList, setRequestDataList] = useState([])
  // useEffect(() => {
  //   if (requestData) {
  //     setRequestDataList([...requestDataList, requestData])
  //   }
  // }, [requestData])
  useEffect(() => {
    return () => {
      setRequestData([])
    }
  }, [])
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="h-full border">
        <ResizablePanel defaultSize={40} className="h-full">
          <Table className="h-full a">
            <TableHeader>
              <TableRow>
                <TableHead>url</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestData.map((request, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    console.log("requestData.content", request.content)
                    const json = transformJsonStringToJson(
                      JSON.parse(request.content)
                    )
                    setText(JSON.stringify(json))
                  }}>
                  <TableCell>{request.request.url}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="h-full overflow-hidden">
            <JSONEditorReact text={text} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<JsonString />)
