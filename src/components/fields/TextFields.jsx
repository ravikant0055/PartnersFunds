import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { MdTextFields } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';

const AttributesData = {
  label: "Text field",
  required: true,
  placeholder: "value here...",
  labelcolor: "", // Default color
  labelsize: 16, // Default font size
  textsize: 16,
  textcolor: "", // Default font color
  height: 50, // Default height
  width: 500, // Default width
}

const TextFields = ({ id }) => {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  useEffect(() => {
    dispatch(addprop({ id, ...AttributesData }));
    console.log("txt id", id);
  }, [dispatch, id]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label style={{
        color: property.labelcolor,
        fontSize: property.labelsize + "px"
      }}

      >
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Input readOnly disabled placeholder={property.placeholder} style={{
        fontSize: property.textsize + "px",
        color: property.textcolor,
        height: property.height + "px",
        width: property.width + "px",
      }} />
    </div>
  )
}

export function TextFieldsPreview({ id }) {
  console.log("txt id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label style={{
        color: property.labelcolor,
        fontSize: property.labelsize + "px"
      }}

      >
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Input placeholder={property.placeholder} style={{
        fontSize: property.textsize + "px",
        color: property.textcolor,
        height: property.height + "px",
        width: property.width + "px",
      }} />
    </div>
  )
}

export function TextFieldsPage({ properties, id, submitValues }) {
  const [values, setValues] = useState("");
  console.log("txt id", id);
  const property = {
    label: "",
    labelcolor: "",
    labelsize: "",
    textcolor: "",
    textsize: "",
    height: "",
    width: "",
    placeholder: "",
    required: false
  };
  
  properties.forEach((item) => {
    switch (item.property_name) {
      case "label":
        property.label = item.property_value;
        break;
      case "fontsize":
        property.labelsize = item.property_value;
        break;
      case "fontweight":
        // Handle font weight if needed
        break;
      case "fontcolor":
        property.labelcolor = item.property_value;
        break;
      // Add more cases as needed for other properties
      default:
        break;
    }
  });
  // const property = properties;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label style={{
        color: property.labelcolor,
        fontSize: property.labelsize + "px"
      }}

      >
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Input placeholder={property.placeholder} style={{
        fontSize: property.textsize + "px",
        color: property.textcolor,
        height: property.height + "px",
        width: property.width + "px",
      }}
      onChange={(e)=> setValues(e.target.value)}
      onBlur={(e)=>{
        if(!submitValues) return;
        submitValues(id, e.target.value)
      }}
      value={values}
      />
    </div>
  )
}


export const TextFieldFormElement = {
  type: "textfield",
  icon: MdTextFields,
  label: "Text Field"
}


export function TextProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  console.log("property data", property);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      required: property.required,
      placeholder: property.placeholder,
      labelcolor: property.labelcolor,
      textsize: property.textsize,
      labelsize: property.labelsize,
      textcolor: property.textcolor,
      height: property.height,
      width: property.width,
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label: property.label,
      required: property.required,
      placeholder: property.placeholder,
      labelcolor: property.labelcolor,
      textcolor: property.textcolor,
      textsize: property.textsize,
      labelsize: property.labelsize,
      height: property.height,
      width: property.width


    });
  }, [form, property]);

  const handleReset = () => {
    form.reset(AttributesData);
    dispatch(updateprop({ id, ...AttributesData }));
  };


  const applyChanges = (formData) => {
    console.log("formdata", formData);
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
      <form onSubmit={form.handleSubmit(applyChanges)}
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
          name="placeholder"
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

        {/* ====================================== */}
        <FormField
          control={form.control}
          name="labelsize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Size</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="1"
                  min="8"
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
          name="textsize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Size</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="1"
                  min="8"
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
          name="labelcolor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Color</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="color"
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
          name="textcolor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Color</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="color"
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text height (px)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="1"
                  min="10"
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
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text width (px)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="1"
                  min="10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* ====================================== */}

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

        <div className="w-full flex justify-between">
          <Button type='submit' className='w-[40%]'>
            Save
          </Button>
          <Button type='button' className='w-[40%]' onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TextFields;