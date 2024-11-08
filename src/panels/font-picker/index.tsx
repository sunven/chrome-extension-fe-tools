import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

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
    setRequestDataList([...requestDataList, requestData])
  }, [requestData])
  return (
    <>
      <h2>Font Picker</h2>
      <p>HELLO WORLD</p>
      {requestDataList.map((requestData, index) => (
        <div key={index}>
          <p>{requestData}</p>
        </div>
      ))}
    </>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<FontPicker />)
