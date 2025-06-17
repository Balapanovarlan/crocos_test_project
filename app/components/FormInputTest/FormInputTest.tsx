// components/MaskedInput.tsx
'use client'

import React, {
  forwardRef,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react'

interface MaskedInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  format: (value: string) => string
  onChange: (value: string) => void
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ format, onChange, value = '', onBlur, ...rest }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = format(e.target.value)
      onChange(formatted)
    }

    return (
      <input
        {...rest}
        ref={ref}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      />
    )
  }
)

export default MaskedInput
