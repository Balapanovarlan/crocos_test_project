import { useState } from "react"
import * as Slider from '@radix-ui/react-slider'

export default function PriceSlider() {
  const [range, setRange] = useState<number[]>([0, 500])
  return (
    <div className="w-full px-2">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={0}
        max={500}
        step={10}
        value={range}
        onValueChange={setRange}
      >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-1">
          <Slider.Range  className="absolute bg-gray-700 rounded-full h-full"/>
        </Slider.Track>

        <Slider.Thumb className="block w-4 h-4 bg-black rounded-full hover:scale-110 transition-transform"/>
        <Slider.Thumb className="block w-4 h-4 bg-black rounded-full hover:scale-110 transition-transform"/>
      </Slider.Root>
      <div className="flex justify-between text-xs mt-1">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  )
}
