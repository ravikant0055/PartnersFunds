import React from 'react'
import { Button } from '../ui/button';
import {AiOutlineClose} from 'react-icons/ai';
import { TextProperties } from '../fields/TextFields';
import { useDispatch } from 'react-redux';
import { propOff } from '../../store/PropertiesSlice';
import { ButtonProperties } from '../fields/Buttons';
import { HeadingProperties } from '../fields/Heading';
import { TextAreaProperties } from '../fields/TextAreaField';
import { DateProperties } from '../fields/DateField';
import { SeparatorProperties } from '../fields/SaparatorField';
import { SpacerProperties } from '../fields/SpacerField';
import { CheckboxProperties } from '../fields/CheckboxField';
import { SelectFieldProperties } from '../fields/SelectField';
import { ToggleProperties } from '../fields/ToggleField';
import { RadioFieldProperties } from '../fields/RadioField';
import { ImageProperties } from '../fields/Image';
import { IconProperties } from '../fields/Icon';

const PropertiesSidebar = ({selectedElement}) => {
  const dispatch = useDispatch();
  const {id, type} = selectedElement;
  console.log("mera type",type);

  const handleClose = () => {
    dispatch(propOff());
  };

  const propertiesData = {
      "textfield"      : <TextProperties id={id}/>,
      "heading"        : <HeadingProperties id={id}/>,
      "button"         : <ButtonProperties id={id}/>,
      "textarea"       : <TextAreaProperties id={id}/>,
      "datefield"      : <DateProperties id={id}/>,
      "separatorfield" : <SeparatorProperties id={id}/>,
      "spacerfield"    : <SpacerProperties id={id}/>,
      "checkbox"       : <CheckboxProperties id={id}/>,
      "selectfield"    : <SelectFieldProperties id={id}/>,
      "togglefield"    : <ToggleProperties id={id}/>,
      "radiofield"     : <RadioFieldProperties id={id} />,
      "image"          : <ImageProperties id={id} />,
      "icon"           : <IconProperties id={id} />
  }

  return (
    <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center mb-5'>
            <p className='text-l text-foreground/70'>Element Properties</p>
            <Button 
            size={"icon"}
            variant={"ghost"}
            onClick={handleClose}
            >
                <AiOutlineClose />
            </Button>
        </div>
         {propertiesData[type]}
    </div>
  )
}

export default PropertiesSidebar;