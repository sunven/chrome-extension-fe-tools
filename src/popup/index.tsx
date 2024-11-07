import "./index.css"

import { Binary, Braces, Clock, Image, Palette } from "lucide-react"

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

const items = [
  {
    label: "JSON",
    icon: <Braces />,
    url: "../tabs/json.html"
  },
  {
    label: "时间（戳）转换",
    icon: <Clock />,
    url: "../tabs/time.html"
  },
  {
    label: "颜色转换",
    icon: <Palette />,
    url: "../tabs/color.html"
  },
  {
    label: "编/解码",
    icon: <Binary />,
    url: "../tabs/text.html"
  },
  {
    label: "图片转 Base64",
    icon: <Image />,
    url: "../tabs/image-to-base64.html"
  }
]

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
                  {items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        onClick={() => {
                          chrome.tabs.create({
                            url: item.url
                          })
                        }}>
                        {item.icon}
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
