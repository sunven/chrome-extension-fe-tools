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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

const FontPicker = () => {
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
                <TableRow key={index}>
                  <TableCell>{requestData.request.url}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}></ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<FontPicker />)
