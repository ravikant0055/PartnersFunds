import React, { useEffect } from 'react'
import { CiImageOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { useDispatch } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';



const AttributesData = {
  label: "Icon",
  required: true,
  placeholder: "value here...",
  height: 50, // Default height
  width: 200, // Default width
}


const Icons = ({ id }) => {
  console.log("icon id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label
      >
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Input type="file" id="iconUpload" name="icon" accept="image/*" placeholder={property.placeholder} style={{
        height: property.height + "px",
        width: property.width + "px",
      }} />
    </div>
  )
}
export function IconFieldPreview({ id }) {

  const previewicon = (e) => {
    const imagePreview = document.getElementById('iconPreview');
    imagePreview.innerHTML = ''; // Clear the current preview
    const file = e.target.files[0];
    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => URL.revokeObjectURL(img.src); // Clean up
      imagePreview.appendChild(img);
    } else {
      imagePreview.innerHTML = '<span>No image selected</span>';
    }
  }


  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>

      <div id="iconPreview"
        style={{
          height: property.height + "px",
          width: property.width + "px",
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Input type="file" id="iconUpload" name="icon" accept="image/*" placeholder={property.placeholder} 
          onChange={previewicon}
        />
        <span>No icon selected</span>
      </div>
    </div>
  )
}

//icon save

export function IconFieldPage({ id, properties, submitValues }) {

  const property = AttributesData;

  properties.forEach((item) => {
      switch (item.property_name) {
        case "label":
          property.label = item.property_value;
          break;
        case "required":
          property.required = item.property_value;
          break;
        case "placeholder":
          property.placeholder = item.property_value;
          break;
        case "height":
          property.height = item.property_value;
          break;
        case "width":
          property.width = item.property_value;
          break;
        default:
          break;
      }
    });

  const iconPreview = (e) => {
      const previewIcon = document.getElementById('previewIcons');
      previewIcon.innerHTML = ''; // Clear the current preview
      const file = e.target.files[0];
      if (file) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          img.onload = () => URL.revokeObjectURL(img.src); // Clean up
          previewIcon.appendChild(img);
      } else {
        previewIcon.innerHTML = '<span>No image selected</span>';
      }
  }

  return (
      <div className='flex flex-col gap-2 w-full'>
          <Label>
              {property.label}
              {property.required && <span className='text-red-600 font-bold'> *</span>}
          </Label>

          <div id="previewIcons"
              style={{
                  height: property.height + "px",
                  width: property.width + "px",
                  overflow: 'hidden', // Hide overflowing parts of the image
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5', // Add a background color to visualize the container
              }}
          >
              <Input type="file" id="imageUpload" name="image" accept="image/*" placeholder={property.placeholder} 
                  onChange={iconPreview}
              />
              <span>No image selected</span>
          </div>
      </div>
  )
}

export const IconFormElement = {
  type: "icon",
  icon: CiImageOn,
  label: "Icon"
}


export function IconProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  console.log(" icon property data", property);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      required: property.required,
      placeholder: property.placeholder,
      color: property.color,
      fontsize: property.fontsize,
      fontcolor: property.color,
      height: property.height,
      width: property.width,
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label: property.label,
      required: property.required,
      placeholder: property.placeholder,
      color: property.color,
      fontcolor: property.fontcolor,
      fontSize: property.fontsize,
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon height (px)</FormLabel>
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
              <FormLabel>Icon width (px)</FormLabel>
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



export default Icons