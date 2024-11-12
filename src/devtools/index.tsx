import jsonStringHTML from "url:../panels/json-string/index.html"

import { Storage } from "@plasmohq/storage"

const storage = new Storage({ area: "local" })

storage.set("requestData", [])

chrome.devtools.panels.create(
  "Json String",
  null,
  // See: https://github.com/PlasmoHQ/plasmo/issues/106#issuecomment-1188539625
  // ex: chrome-extension://enffmhlimdbgmifhemllbmhedbgplgkc/json-string.c78f005d.html?1731032454801
  jsonStringHTML.split("/").pop()
)

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  if (request.request.url.startsWith("chrome-extension://")) {
    return
  }

  if (
    !request.response.headers.find(
      (header) =>
        header.name.toLowerCase() === "content-type" &&
        header.value.toLowerCase().includes("application/json")
    )
  ) {
    return
  }

  const url = new URL(request.request.url)

  if (
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.hostname.startsWith("192.168")
  ) {
    request.getContent(async function (content, encoding) {
      const requestData = (await storage.get<any[]>("requestData")) || []
      requestData.push({
        request: request.request,
        response: request.response,
        content
      })
      storage.set("requestData", requestData)
      // chrome.devtools.inspectedWindow.eval(
      //   'console.log("getContent:' +
      //     request.request.url +
      //     '" + ' +
      //     JSON.stringify(request.response) +
      //     ")"
      // )
    })
  }
})
