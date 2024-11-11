import jsonStringHTML from "url:../panels/json-string/index.html"

import { Storage } from "@plasmohq/storage"

const storage = new Storage({ area: "local" })

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

  if (request.request.url.includes("getApplicationSaasList")) {
    request.getContent(function (content, encoding) {
      storage.set("requestData", {
        request: request.request,
        response: request.response,
        content
      })
      chrome.devtools.inspectedWindow.eval(
        'console.log("getContent:' +
          request.request.url +
          '" + ' +
          JSON.stringify(request.response) +
          ")"
      )
    })
  }
})
