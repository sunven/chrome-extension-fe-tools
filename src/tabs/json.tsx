import { Storage } from "@plasmohq/storage"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"

import "./json.css"

import { debounce } from "lodash-es"
import { Braces, Trash2 } from "lucide-react"
import { useCallback, useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import CodeMirror from "@/components/code-mirror"
import JSONEditorReact from "@/components/json-editor"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

const jsonStr = `{"string":"Hello, World!","number":42,"array":["apple","banana"],"object":{"name":"John Doe","courses":[{"courseName":"Mathematics","credits":3}]}}`

// https://codemirror.net/examples/decoration/

function formatJsonString(str) {
  return JSON.stringify(JSON.parse(str), null, 2)
}

export default function Json() {
  const [text = jsonStr, setText, { setRenderValue, setStoreValue, remove }] =
    useStorage(
      {
        key: "json:text",
        instance: new Storage({
          area: "local"
        })
      },
      jsonStr
    )
  const setStoreValueDebounce = useCallback(debounce(setStoreValue, 1000), [
    setStoreValue
  ])

  useEffect(() => {}, [])

  return (
    <div className="h-full p-2">
      <Tabs defaultValue="account" className="h-full flex flex-col">
        <TabsList className="flex self-center">
          <TabsTrigger value="account">View</TabsTrigger>
          <TabsTrigger value="password">Diff</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full border">
            <ResizablePanel defaultSize={40}>
              <div className="h-full flex flex-col overflow-hidden">
                <div className="flex gap-1 justify-end border-b">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setText(formatJsonString(text))
                          }}>
                          <Braces />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>format</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            remove()
                          }}>
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>delete storage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CodeMirror
                  className="flex-1 overflow-auto"
                  text={text}
                  onTextChange={(text) => {
                    setRenderValue(text)
                    setStoreValueDebounce()
                  }}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <div className="h-full overflow-hidden">
                <JSONEditorReact text={text} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
        {/* <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
