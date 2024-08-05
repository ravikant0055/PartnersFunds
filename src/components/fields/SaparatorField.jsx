import React from 'react'
import { Label } from '../ui/label'
import { RiSeparator } from 'react-icons/ri';
import { Separator } from '../ui/separator';

const SeparatorField = ({id}) => {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <Label className='text-muted-foreground'>Separator Field</Label>
      <Separator/>
    </div>
  )
}

export function SeparatorFieldsPreview({id}) {
  return <Separator/>;
}

export function SeparatorFieldsPage({id, properties}) {
  return <Separator/>;
}

export const SeparatorFormElement={
    type  : "separatorfield",
    icon  : RiSeparator,
    label : "Separator Field"
}


export function SeparatorProperties({id}) {
  return (
    <>
       <p>No Properties for this element</p>
    </>
  );
}

export default SeparatorField;