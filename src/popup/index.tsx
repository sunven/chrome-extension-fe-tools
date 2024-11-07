import "./index.css"

import { Binary, Braces, Clock, Palette } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar"

function Popup() {
  return (
    <div className="w-[200px] h-[400px]">
      <SidebarProvider open={true} defaultOpen={true}>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Front Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        chrome.tabs.create({
                          url: "../tabs/json.html"
                        })
                      }}>
                      <Braces />
                      <span>JSON</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        chrome.tabs.create({
                          url: "../tabs/time.html"
                        })
                      }}>
                      <Clock />
                      <span>时间（戳）转换</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        chrome.tabs.create({
                          url: "../tabs/color.html"
                        })
                      }}>
                      <Palette />
                      <span>颜色转换</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        chrome.tabs.create({
                          url: "../tabs/text.html"
                        })
                      }}>
                      <Binary />
                      <span>编/解码</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}

export default Popup
