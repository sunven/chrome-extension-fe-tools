import md5 from "crypto-js/md5"
import { useCallback, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import "@/globals.css"

function escapeHtml(unsafe) {
  const textarea = document.createElement("textarea")
  textarea.textContent = unsafe // 将文本内容设置为需要转义的字符串
  return textarea.innerHTML // 获取转义后的 HTML
}

function unescapeHtml(escaped) {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = escaped // 将转义的 HTML 设置为 textarea 的 innerHTML
  return textarea.value // 获取反转义后的文本内容
}

export default function Component() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encode = useCallback((type: string, text: string) => {
    try {
      switch (type) {
        case "html-escape":
          return escapeHtml(text)
        case "unicode":
          return text
            .split("")
            .map(
              (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`
            )
            .join("")
        case "utf8":
          return encodeURIComponent(text)
        case "base64":
          return btoa(text)
        case "md5":
          return md5(text)
        case "html2js":
          return `document.write('${text.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')`
        default:
          return text
      }
    } catch (error) {
      console.error("Encoding error:", error)
      return "Encoding error occurred"
    }
  }, [])

  const decode = useCallback((type: string, text: string) => {
    try {
      switch (type) {
        case "html-unescape":
          return unescapeHtml(text)
        case "unicode":
          return text.replace(/\\u[\dA-F]{4}/gi, (match) =>
            String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
          )
        case "utf8":
          return decodeURIComponent(text)
        case "base64":
          return atob(text)
        default:
          return text
      }
    } catch (error) {
      console.error("Decoding error:", error)
      return "Decoding error occurred"
    }
  }, [])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">字符串编解码</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="私に需要进行编解码的字符串"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px]"
        />

        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="encode" className="flex-1">
              编码
            </TabsTrigger>
            <TabsTrigger value="decode" className="flex-1">
              解码
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encode">
            <Tabs defaultValue="html-escape" className="w-full">
              <TabsList className="w-full flex-wrap">
                <TabsTrigger value="html-escape">HTML转义</TabsTrigger>
                <TabsTrigger value="unicode">Unicode编码</TabsTrigger>
                <TabsTrigger value="utf8">UTF8(URL)编码</TabsTrigger>
                <TabsTrigger value="base64">Base64编码</TabsTrigger>
                <TabsTrigger value="md5">MD5编码</TabsTrigger>
                <TabsTrigger value="html2js">HTML2JS</TabsTrigger>
              </TabsList>
              {[
                "html-escape",
                "unicode",
                "utf8",
                "base64",
                "md5",
                "html2js"
              ].map((type) => (
                <TabsContent key={type} value={type}>
                  <Textarea
                    value={encode(type, input)}
                    readOnly
                    className="min-h-[100px]"
                  />
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="decode">
            <Tabs defaultValue="html-unescape" className="w-full">
              <TabsList className="w-full flex-wrap">
                <TabsTrigger value="html-unescape">HTML反转义</TabsTrigger>
                <TabsTrigger value="unicode">Unicode解码</TabsTrigger>
                <TabsTrigger value="utf8">UTF8(URL)解码</TabsTrigger>
                <TabsTrigger value="base64">Base64解码</TabsTrigger>
              </TabsList>
              {["html-unescape", "unicode", "utf8", "base64"].map((type) => (
                <TabsContent key={type} value={type}>
                  <Textarea
                    value={decode(type, input)}
                    readOnly
                    className="min-h-[100px]"
                  />
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
