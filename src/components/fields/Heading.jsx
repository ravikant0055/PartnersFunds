import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { LuHeading1 } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
  label: "Heading",
  fontsize: 16,
  fontweight: 500,
  fontcolor: "",
  eovo: {
    EO: {
      entityobject: "",
      entityattribute: ""
    },
    VO: {
      viewobject: "",
      viewattribute: ""
    }
  },
}

const Heading = ({ id }) => {
  console.log("txt id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id, ...AttributesData }));
    }
  }, [dispatch, id, property]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label style={{
        fontSize: property.fontsize + "px",
        fontWeight: property.fontweight,
        color: property.fontcolor
      }}>
        {property.label}
      </Label>
    </div>
  )
}

export function HeadingPreview({ id }) {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label style={{
        fontSize: property.fontsize + "px",
        fontWeight: property.fontweight,
        color: property.fontcolor
      }}>
        {property.label}
      </Label>
    </div>
  )
}

export function HeadingPage({ id, properties, submitValues }) {
  // const property = properties;
  const [values, setValues] = useState("");
  const property = AttributesData;

  properties.forEach((item) => {
    switch (item.property_name) {
      case "label":
        property.label = item.property_value;
        break;
      case "fontsize":
        property.fontsize = item.property_value;
        break;
      case "fontweight":
        // Handle font weight if needed
        property.fontweight = item.property_value;
        break;
      case "fontcolor":
        property.fontcolor = item.property_value;
        break;
      // Add more cases as needed for other properties
      default:
        break;
    }
  });
  console.log("property.fontsize", property.fontsize);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label style={{
        fontSize: property.fontsize + "px",
        fontWeight: property.fontweight,
        color: property.fontcolor
      }}>
        {property.label}
      </Label>
    </div>
  )
}

export const HeadingFormElement = {
  type: "heading",
  icon: LuHeading1,
  label: "Heading"
}


export function HeadingProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const entityData = useSelector((state) => state.entitydata);
  const viewData = useSelector((state) => state.viewdata);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      label: property.label,
      fontsize: property.fontsize,
      fontweight: property.fontweight,
      fontcolor: property.fontcolor,
      eovo: {
        EO: {
          entityobject: property.eovo.EO.entityobject,
          entityattribute: property.eovo.EO.entityattribute,
        },
        VO: {
          viewobject: property.eovo.VO.viewobject,
          viewattribute: property.eovo.VO.viewattribute,
        }
      },
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label: property.label,
      fontsize: property.fontsize,
      fontweight: property.fontweight,
      fontcolor: property.fontcolor,
      eovo: {
        EO: {
          entityobject: property.eovo.EO.entityobject,
          entityattribute: property.eovo.EO.entityattribute,
        },
        VO: {
          viewobject: property.eovo.VO.viewobject,
          viewattribute: property.eovo.VO.viewattribute,
        }
      },
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
        {/* ======================================== */}

        <FormField
          control={form.control}
          name="eovo.EO.entityobject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entity Object Name</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select enity object">
                      {field.value === false ? "No" : JSON.stringify(field.value)?.entityname}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"false".toString()}>No</SelectItem>
                    {entityData?.map((item, index) => (
                      <SelectItem key={index} value={JSON.stringify(item.entityname)}>
                        {item.entityname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eovo.EO.entityattribute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entity Object Attribute</FormLabel>
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
          name="eovo.VO.viewobject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>View Object Name</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select view object">
                      {field.value === false ? "No" : JSON.stringify(field.value)?.viewname}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"false".toString()}>No</SelectItem>
                    {viewData?.map((item, index) => (
                      <SelectItem key={index} value={JSON.stringify(item.viewname)}>
                        {item.viewname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eovo.VO.viewattribute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>View Object Attribute</FormLabel>
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
          name="fontsize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Size (px)</FormLabel>
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
              <FormLabel>Font Color</FormLabel>
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
          name="fontweight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Weight</FormLabel>
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

        {/* ======================================== */}
        <div className="w-full flex items-center justify-center">
          <Button type='button' className='w-[40%]' onClick={handleReset}>
            Reset
          </Button>
        </div>

      </form>
    </Form>
  );
}

export default Heading