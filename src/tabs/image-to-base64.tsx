import { Image as ImageIcon, Upload } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

import "@/globals.css"

import { Input } from "@/components/ui/input"

export default function ImageToBase64() {
  const [dataUri, setDataUri] = useState("")
  const [originalSize, setOriginalSize] = useState(0)
  const [dataUriSize, setDataUriSize] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [copyLabel, setCopyLabel] = useState("copy")

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setDataUri(result)
      setOriginalSize(file.size)
      setDataUriSize(result.length)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect]
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (items) {
        for (let item of Array.from(items)) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile()
            if (file) handleFileSelect(file)
            break
          }
        }
      }
    },
    [handleFileSelect]
  )

  const handleCopy = useCallback(() => {
    if (dataUri) {
      navigator.clipboard.writeText(dataUri).then(() => {
        setCopyLabel("copied...")
        setTimeout(() => {
          setCopyLabel("copy")
        }, 2000)
      })
    }
  }, [])

  // Add paste event listener
  useEffect(() => {
    document.addEventListener("paste", handlePaste)
    return () => document.removeEventListener("paste", handlePaste)
  }, [handlePaste])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            图片Base64编码工具 (DataURI数据)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div
            // className="border-2 border-dashed rounded-lg p-4 text-center"
            className={`border-2 border-dashed rounded-lg p-4 text-center ${isDragging ? "bg-gray-200" : ""}`} // 根据状态添加高亮样式
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true) // 拖拽时设置状态
            }}
            onDragLeave={() => setIsDragging(false)}>
            <Input
              type="file"
              id="fileInput"
              // className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelect(file)
              }}
            />
            <p className="text-sm text-muted-foreground mt-2">
              或者选择一张图片拖拽到这里来
            </p>
            {dataUri && (
              <div className="mt-4">
                <img
                  src={dataUri}
                  alt="Preview"
                  className="max-w-full h-auto mx-auto"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
          </div>

          <div className="space-y-4 flex flex-col">
            <Textarea
              placeholder="DataURI"
              value={dataUri}
              readOnly
              className="flex-1 font-mono text-sm"
            />
            <Button className="mt-2" onClick={handleCopy}>
              {copyLabel}
            </Button>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                原始图片大小: {(originalSize / 1024).toFixed(2)} KB
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                DataURI 大小: {(dataUriSize / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="mt-4">
        <AlertDescription>
          <ol className="list-decimal list-inside space-y-1">
            <li>支持屏幕截图直接Ctrl + V</li>
            <li>复制文件在此处粘贴，只能得到文件icon</li>
          </ol>
        </AlertDescription>
      </Alert>
    </div>
  )
}
