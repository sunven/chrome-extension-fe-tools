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

const JsonString = () => {
  const [text, setText] = useState("")
  const [requestData] = useStorage({
    key: "requestData",
    instance: new Storage({
      area: "local"
    })
  })
  console.log("requestData", requestData)
  const [requestDataList, setRequestDataList] = useState([])
  useEffect(() => {
    if (requestData) {
      setRequestDataList([...requestDataList, requestData])
    }
  }, [requestData])
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="h-full border">
        <ResizablePanel defaultSize={40}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>url</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestDataList.map((requestData, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    console.log("requestData.content", requestData.content)
                    setText(requestData.content)
                  }}>
                  <TableCell>{requestData.request.url}</TableCell>
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
