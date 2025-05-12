// 确保在扩展安装或更新时创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  // 创建一个父级菜单
  chrome.contextMenus.create({
    id: "copy-page-title",
    title: "copy page title",
    contexts: ["all"] // 在所有上下文中显示
  })

  // // 创建子菜单项 - 在选中文本时处理
  // chrome.contextMenus.create({
  //   id: "fe-tools-json",
  //   parentId: "fe-tools",
  //   title: "JSON 格式化",
  //   contexts: ["selection"] // 只在选中文本时显示
  // })

  // // 创建子菜单项 - 图片处理
  // chrome.contextMenus.create({
  //   id: "fe-tools-image",
  //   parentId: "fe-tools",
  //   title: "图片转 Base64",
  //   contexts: ["image"] // 只在图片上显示
  // })

  // // 创建子菜单项 - 页面链接
  // chrome.contextMenus.create({
  //   id: "fe-tools-link",
  //   parentId: "fe-tools",
  //   title: "处理链接",
  //   contexts: ["link"] // 只在链接上显示
  // })

  // // 创建一个独立的菜单项
  // chrome.contextMenus.create({
  //   id: "fe-tools-color",
  //   title: "颜色工具",
  //   contexts: ["all"]
  // })

  // console.log("右键菜单已创建")
})

// 处理右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "copy-page-title":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text: string) => {
          navigator.clipboard.writeText(text)
        },
        args: [tab.title]
      })
      break
    case "fe-tools-json":
      if (info.selectionText) {
        // 处理选中的文本，例如：尝试解析JSON并在新标签页中打开JSON工具
        try {
          // 将选中文本保存到本地存储，然后打开JSON工具页面
          chrome.storage.local.set({ jsonText: info.selectionText }, () => {
            chrome.tabs.create({ url: "tabs/json.html" })
          })
        } catch (error) {
          console.error("处理JSON失败:", error)
        }
      }
      break

    case "fe-tools-image":
      if (info.srcUrl) {
        // 打开图片转Base64工具页面，并传递图片URL
        chrome.tabs.create({
          url: `tabs/image-to-base64.html?imageUrl=${encodeURIComponent(info.srcUrl)}`
        })
      }
      break

    case "fe-tools-link":
      if (info.linkUrl) {
        // 处理链接，例如：复制链接，或执行其他操作
        console.log("处理链接:", info.linkUrl)
        // 这里可以实现链接的处理逻辑
      }
      break

    case "fe-tools-color":
      // 打开颜色工具页面
      chrome.tabs.create({ url: "tabs/color.html" })
      break

    default:
      break
  }
})
