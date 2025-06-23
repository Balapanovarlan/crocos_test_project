import { useState } from "react"
import * as Slider from '@radix-ui/react-slider'

export interface PriceSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
}


export default function PriceSlider({
  min,
  max,
  step = 1,
  value,
  onValueChange,
} : PriceSliderProps) {
  return (
    <div className="w-full px-2">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
      >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-1">
          <Slider.Range  className="absolute bg-gray-700 rounded-full h-full"/>
        </Slider.Track>

        <Slider.Thumb className="block w-4 h-4 bg-black rounded-full hover:scale-110 transition-transform"/>
        <Slider.Thumb className="block w-4 h-4 bg-black rounded-full hover:scale-110 transition-transform"/>
      </Slider.Root>
      <div className="flex justify-between text-xs mt-1">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  )
}
