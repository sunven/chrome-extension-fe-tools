import { basicSetup, EditorView } from "codemirror"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import { EditorState } from "@codemirror/state"

import "./json.css"

import { Braces } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { json } from "@codemirror/lang-json"
import ReactJsonView from "@microlink/react-json-view"

const jsonStr = `{"string":"Hello, World!","number":42,"array":["apple","banana"],"object":{"name":"John Doe","courses":[{"courseName":"Mathematics","credits":3}]}}`

function formatJson(str) {
  return JSON.stringify(JSON.parse(str), null, 2)
}

// https://codemirror.net/examples/decoration/

/**
 *
 * @param editorView
 * @param doc
 * https://discuss.codemirror.net/t/how-to-set-new-doc-content/5156
 */
function setDoc(editorView, doc) {
  editorView.dispatch({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: doc
    }
  })
}

function autoFormat(editorView) {
  setDoc(editorView, formatJson(editorView.state.doc))
}

export default function Json() {
  const monacoEl = useRef(null)
  const [editorView, setEditorView] = useState<EditorView>(null)

  useEffect(() => {
    let editorView = new EditorView({
      doc: jsonStr,
      extensions: [basicSetup, json()],
      parent: monacoEl.current
    })
    setEditorView(editorView)
    autoFormat(editorView)
  }, [])
  return (
    <div className="h-full p-2">
      <Tabs defaultValue="account" className="h-full flex flex-col">
        <TabsList className="flex  self-center">
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
                            autoFormat(editorView)
                          }}>
                          <Braces />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>format</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex-1 overflow-auto" ref={monacoEl}></div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <div className="h-full p-2 overflow-auto">
                <ReactJsonView
                  name={false}
                  enableClipboard={false}
                  displayDataTypes={false}
                  src={JSON.parse(editorView?.state.doc.toString() || "{}")}
                />
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
