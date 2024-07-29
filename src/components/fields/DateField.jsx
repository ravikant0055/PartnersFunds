import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { BsCalendarDate } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from 'react-day-picker';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from 'src/lib/utils';

const AttributesData = {
  label:"Date field",
  required: false,
//   placeholder: "Pick a date"
}

const DateField = ({id}) => {
  console.log("txt id",id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
         {property.label}
         {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Button variant={"outline"} className='w-full justify-start text-left font-normal' >
        <CalendarIcon className='mr-2 h-4 w-4'/>
        <span>Pick a date</span>
      </Button>
    </div>
  )
}

export function DateFieldsPreview({id}) {
  const [date, setDate] = useState(); 

  console.log("txt id",id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
         {property.label}
         {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Popover>
         <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn('w-full justify-start text-left font-normal',
                !date && "text-muted-foreground"
            )} >
              <CalendarIcon className='mr-2 h-4 w-4'/>
              {date ? format(date,"PPP") : <span>Pick a date</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0' align='start'>
            <Calendar mode="single" selected={date}
              onSelect={(date)=>{
                  setDate(date);

                //   if(!submitValue) return;

                //   const value = date?.toUTCString() || "";
                //   const valid = DateFieldFormElement.validate(element, value);
                //   setError(!valid);
                //   submitValue(element.id,value);
              }}
              initialFocus
            />
         </PopoverContent>
      </Popover>
    </div>
  )
}

export const DateFieldFormElement = {
    type:"datefield",
    icon : BsCalendarDate,
    label : "Date Field"
}


export function DateProperties({id}) {
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
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
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm ">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>  
    </Form>
  );
}

export default DateField;