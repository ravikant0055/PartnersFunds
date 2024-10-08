import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { IoToggleSharp } from "react-icons/io5";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
  label:"Toggle field",
  required: true,
}

const ToggleField = ({id , x , y}) => {
  
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
    useEffect(() => {
        if (!property || property.id !== id) {
          dispatch(addprop({ id,x,y, ...AttributesData }));
      }
  }, [dispatch, id, property]);
  
  return (
    <div className='toggle-div'>
            <Switch />
            <div className='toggle-label-div'>
                <Label>
                    {property.label}
                    {property.required && <span className='required-css'> *</span>}
                </Label>
            </div>
        </div>
  )
}

export function ToggleFieldsPreview({id}) {
  console.log("txt id",id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex items-top space-x-2'>
            <Switch />
            <div className='grid gap-1.5 leading-none'>
                <Label>
                    {property.label}
                    {property.required && <span className='text-red-600 font-bold'> *</span>}
                </Label>
            </div>
        </div>
  )
}

export function ToggleFieldsPage({id, properties ,submitValues}) {
  console.log("txt id",id);
  const [values, setValues] = useState("");
  const property = properties;
  return (
    <div className='flex items-top space-x-2'>
            <Switch 
            onChange={(e)=> setValues(e.target.value)}
            onBlur={(e)=>{
              if(!submitValues) return;
              submitValues(id, e.target.value)
            }}
            value={values}
            />
            <div className='grid gap-1.5 leading-none'>
                <Label>
                    {property.label}
                    {property.required && <span className='text-red-600 font-bold'> *</span>}
                </Label>
            </div>
        </div>
  )
}

export const ToggleFieldFormElement={
    type:"togglefield",
    icon : IoToggleSharp,
    label : "Toggle Field"
}


export function ToggleProperties({id}) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  console.log("property data",property);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      required: property.required,
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label: property.label,
      required: property.required,
    });
  }, [form, property]);


  const applyChanges = (formData) => {
    console.log("formdata",formData);
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
          name="id"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Id</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  disabled
                  className='prop-area'
                  {...field}
                  value={id}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
       
       <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Required</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder={field.value ? 'Yes' : 'No'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

      </form>  
    </Form>
  );
}

export default ToggleField;