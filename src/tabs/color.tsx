import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import "@/globals.css"

export default function Color() {
  // RGB to HEX state
  const [rgb, setRgb] = useState({ r: "", g: "", b: "" })
  const [hexResult, setHexResult] = useState("#000000")

  // HEX to RGB state
  const [hex, setHex] = useState("")
  const [rgbResult, setRgbResult] = useState({ r: "0", g: "0", b: "0" })

  // RGB to HEX conversion
  const convertToHex = () => {
    const r = parseInt(rgb.r) || 0
    const g = parseInt(rgb.g) || 0
    const b = parseInt(rgb.b) || 0

    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
        .toString(16)
        .padStart(2, "0")}`
      setHexResult(hex.toUpperCase())
    }
  }

  // HEX to RGB conversion
  const convertToRgb = () => {
    const hexCode = hex.replace("#", "")
    if (/^[0-9A-Fa-f]{6}$/.test(hexCode)) {
      const r = parseInt(hexCode.substring(0, 2), 16)
      const g = parseInt(hexCode.substring(2, 4), 16)
      const b = parseInt(hexCode.substring(4, 6), 16)
      setRgbResult({ r: r.toString(), g: g.toString(), b: b.toString() })
    }
  }

  // Handle RGB input changes
  const handleRgbChange = (color: "r" | "g" | "b", value: string) => {
    const numValue = parseInt(value)
    if (value === "" || (numValue >= 0 && numValue <= 255)) {
      setRgb((prev) => ({ ...prev, [color]: value }))
    }
  }

  // Handle HEX input change
  const handleHexChange = (value: string) => {
    if (value.startsWith("#")) {
      setHex(value)
    } else {
      setHex("#" + value)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl">颜色转换</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* RGB to HEX */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">[RGB] → [HEX]</h3>
          <div className="flex items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="r">R</Label>
              <Input
                id="r"
                value={rgb.r}
                onChange={(e) => handleRgbChange("r", e.target.value)}
                className="w-24"
                placeholder="0-255"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g">G</Label>
              <Input
                id="g"
                value={rgb.g}
                onChange={(e) => handleRgbChange("g", e.target.value)}
                className="w-24"
                placeholder="0-255"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="b">B</Label>
              <Input
                id="b"
                value={rgb.b}
                onChange={(e) => handleRgbChange("b", e.target.value)}
                className="w-24"
                placeholder="0-255"
              />
            </div>
            <Button onClick={convertToHex} className="mb-0.5">
              转换
            </Button>
            <div className="flex items-center gap-2">
              <Input value={hexResult} readOnly className="w-32 font-mono" />
              <div
                className="w-8 h-8 border rounded"
                style={{ backgroundColor: hexResult }}
                aria-label="Color preview"
              />
            </div>
          </div>
        </div>

        {/* HEX to RGB */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">[HEX] → [RGB]</h3>
          <div className="flex items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="hex">HEX</Label>
              <Input
                id="hex"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="w-40 font-mono"
                placeholder="#000000"
              />
            </div>
            <Button onClick={convertToRgb} className="mb-0.5">
              转换
            </Button>
            <div className="space-y-2">
              <Label htmlFor="result-r">R</Label>
              <Input
                id="result-r"
                value={rgbResult.r}
                readOnly
                className="w-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="result-g">G</Label>
              <Input
                id="result-g"
                value={rgbResult.g}
                readOnly
                className="w-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="result-b">B</Label>
              <Input
                id="result-b"
                value={rgbResult.b}
                readOnly
                className="w-24"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
