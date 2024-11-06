import "./time.css"

import dayjs from "dayjs"
import { debounce } from "lodash-es"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Time() {
  const [currentTime, setCurrentTime] = useState("")
  const [currentUnix, setCurrentUnix] = useState(0)
  const [unixInput, setUnixInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [unixResult, setUnixResult] = useState("")
  const [dateResult, setDateResult] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs()
      setCurrentTime(now.format("YYYY/MM/DD HH:mm:ss"))
      setCurrentUnix(Math.floor(now.valueOf() / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleUnixConvert = debounce(() => {
    try {
      const timestamp = parseInt(unixInput)
      if (isNaN(timestamp)) {
        setDateResult("请输入有效的Unix时间戳")
        return
      }
      const date = dayjs.unix(timestamp)
      setDateResult(date.format("YYYY-MM-DD HH:mm:ss"))
    } catch (error) {
      setDateResult("转换失败")
    }
  }, 300)

  const handleDateConvert = debounce(() => {
    try {
      const date = dayjs(dateInput)
      if (!date.isValid()) {
        setUnixResult("请输入有效的日期时间")
        return
      }
      setUnixResult(Math.floor(date.valueOf() / 1000).toString())
    } catch (error) {
      setUnixResult("转换失败")
    }
  }, 300)

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl">时间戳转换</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>现在的当地时间为 :</Label>
              <Input value={currentTime} readOnly />
            </div>
            <div>
              <Label>现在的Unix时间戳 :</Label>
              <Input value={currentUnix} readOnly />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">【Unix时间戳】→【当地时间】</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="例如: 1507722100"
                value={unixInput}
                onChange={(e) => setUnixInput(e.target.value)}
              />
            </div>
            <Button onClick={handleUnixConvert}>转换</Button>
          </div>
          <div className="p-3 bg-muted rounded-md">
            <Label>转换结果:</Label>
            <p className="text-sm font-medium">{dateResult}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">【当地时间】→【Unix时间戳】</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="例如: 2017-10-11 19:42:00"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
            </div>
            <Button onClick={handleDateConvert}>转换</Button>
          </div>
          <div className="p-3 bg-muted rounded-md">
            <Label>转换结果:</Label>
            <p className="text-sm font-medium">{unixResult}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
