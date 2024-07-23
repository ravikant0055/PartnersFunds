import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from '../ui/textarea';

const AttributesData = {
  label:"Text Area",
  require: true,
  placeholder: "value here...",
  rows: 3,
}

const TextAreaField = () => {
  const {label, required, placeholder, rows} = AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
           {label}
           {required && "*"}
      </Label>

      <Textarea readOnly disabled placeholder={placeholder} rows={rows}/>
      
    </div>
  )
}

export const TextAreaFormElement={
    type:"textarea",
    icon : BsTextareaResize,
    label : "Text Area"
}


export function TextAreaProperties() {
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      label: AttributesData.label,
      required: AttributesData.required,
      placeHolder: AttributesData.placeHolder,
    },
  });

  useEffect(() => {
    form.reset(AttributesData);
  }, [form]);

  function applyChanges() {
    console.log("apply change");
  }

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
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
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PlaceHolder</FormLabel>
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
          name="font size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font size</FormLabel>
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

export default TextAreaField;