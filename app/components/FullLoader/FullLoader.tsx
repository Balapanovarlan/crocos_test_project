// components/FullScreenLoader.tsx
import { FC } from 'react'
import { ClipLoader } from 'react-spinners'

interface FullScreenLoaderProps {
  color?: string
  size?: number
}

export const FullScreenLoader: FC<FullScreenLoaderProps> = ({
  color = '#3B82F6', 
  size = 80,
}) => {
  return (
    <div
      className="
        h-full           
        flex items-center      
        justify-center     
      "
    >
      <ClipLoader size={size} color={color} />
    </div>
  )
}
