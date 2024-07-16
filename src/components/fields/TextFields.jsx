import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const AttributesData = {
  label:"Text field",
  require: false,
  placeholder: "value here..."
}

const TextFields = () => {
  const {label, required, placeholder} = AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
           {label}
           {required && "*"}
           <Input readOnly disabled placeholder={placeholder} />
      </Label>
    </div>
  )
}

export default TextFields