import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { RxButton } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';

const AttributesData = {
  label: "Button",
  color: "", // Default color
  fontsize: 16, // Default font size
  fontcolor: "", // Default font color
  height: 50, // Default height
  width: 200, // Default width
  onclick: ""
}

const Buttons = ({ id }) => {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Button
        style={{
          backgroundColor: property.color,
          color: property.fontcolor,
          fontSize: property.fontsize + "px",
          height: property.height + "px",
          width: property.width + "px",
        }}
      >
        {property.label}
      </Button>
    </div>
  )
}

export function ButtonsPreview({ id }) {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const alertFunc = () => {
    console.log("Button Clicked", property.onclick);
    };
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Button onClick={alertFunc}
        style={{
          backgroundColor: property.color,
          color: property.fontcolor,
          fontSize: property.fontsize + "px",
          height: property.height + "px",
          width: property.width + "px",
        }}
      >
        {property.label}
      </Button>
    </div>
  )
}

export const ButtonFormElement = {
  type: "button",
  icon: RxButton,
  label: "Button"
}


export function ButtonProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      color: property.color,
      fontsize: property.fontsize,
      fontcolor: property.fontcolor,
      height: property.height,
      width: property.width,
      onclick: property.onclick
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label: property.label,
      color: property.color,
      fontsize: property.fontsize,
      fontcolor: property.fontcolor,
      height: property.height,
      width: property.width,
      onclick: property.onclick
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
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button Colour</FormLabel>
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
          name="fontsize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font size</FormLabel>
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
          name="fontcolor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font color</FormLabel>
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
              <FormLabel>Button height (px)</FormLabel>
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
              <FormLabel>Button width (px)</FormLabel>
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
          name="onclick"
          render={({ field }) => (
            <FormItem>
              <FormLabel>onClick</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
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

export default Buttons;