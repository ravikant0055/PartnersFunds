import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { LuSeparatorHorizontal } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Slider } from '../ui/slider';

const AttributesData = {
  height : 20,
}

const SpacerFields = ({id}) => {
  console.log("txt id",id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
    useEffect(() => {
        if (!property || property.id !== id) {
          dispatch(addprop({ id, ...AttributesData }));
      }
  }, [dispatch, id, property]);
  
  return (
    <div className='flex flex-col gap-2 w-full items-center'>
      <Label className='text-muted-foreground'>Spacer field : {property.height}px </Label>
      <LuSeparatorHorizontal className='h-8 w-8'/>
    </div>
  )
}

export function SpacerFieldsPreview({id}) {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const height = property.height;
  return (
    <div style={{height ,width : "100px"}}></div>
  )
}

export function SpacerFieldsPage({id, properties}) {
  const property = properties;
  const height = property.height;
  return (
    <div style={{height ,width : "100px"}}></div>
  )
}

export const SpacerFormElement={
    type:"spacerfield",
    icon : LuSeparatorHorizontal,
    label : "Spacer Field"
}


export function SpacerProperties({id}) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  
  console.log("property data",property);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      height: property.height,
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
        height: property.height,
    });
  }, [form, property]);


  const applyChanges = (formData) => {
    const existingProperty = property.id;
    if (existingProperty) {
      dispatch(updateprop({ id, ...formData }));
    } else {
      dispatch(addprop({ id, ...formData }));
    }
    console.log("apply change");
  };

  return (
     <Form {...form}>
       <form onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"> 
        
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px) : {form.watch("height")} </FormLabel>
              <FormControl className='pt-2'>
                <Slider
                   defaultValues={[field.value]}
                   min={5}
                   max={200}
                   step={1}
                   onValueChange={(value)=>{
                    field.onChange(value[0]);
                   }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
      </form>  
    </Form>
  );
}

export default SpacerFields;