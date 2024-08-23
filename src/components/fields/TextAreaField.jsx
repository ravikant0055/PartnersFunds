import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from '../ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
  label: "Text Area",
  require: true,
  disable:false,
  hide:false,
  placeholder: "value here...",
  rows: 3,
  fontsize: "16px", // Default font size
  fontcolor: "", // Default font color
  height: "50px", // Default height
  width: "200px", // Default width
  value: "",
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

const TextAreaField = ({ id }) => {
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
      <Label>
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>

      <Textarea readOnly disabled placeholder={property.placeholder} rows={property.rows} style={{
        fontcolor: property.fontcolor,
        fontSize: property.fontsize + "px",
        height: property.height + "px",
        width: property.width + "px",
      }} className='border-black'
      />

    </div>
  )
}

export function TextAreaFieldPreview({ id }) {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Textarea placeholder={property.placeholder} rows={property.rows} value={property.value} style={{
        fontcolor: property.fontcolor,
        fontSize: property.fontsize + "px",
        height: property.height + "px",
        width: property.width + "px",
      }} />
    </div>
  )
}

export function TextAreaFieldPage({ id, properties, submitValues }) {

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update state to trigger re-render
    if (submitValues) {
      submitValues(id, newValue); // Update formValues
    }
  };
  const property = AttributesData;
  // const [values, setValues] = useState("");
  properties.forEach((item) => {
    switch (item.property_name) {
      case "label":
        property.label = item.property_value;
        break;
      case "require":
        property.require = item.property_value;
        break;
      case "rows":
        property.rows = item.property_value;
        break;
      case "placeholder":
        property.placeholder = item.property_value;
        break;
      case "fontsize":
        property.textsize = item.property_value;
        break;
      case "fontcolor":
        property.fontcolor = item.property_value;
        break;
      case "height":
        property.height = item.property_value;
        break;
      case "width":
        property.width = item.property_value;
        break;
        case "value":
        property.value = item.property_value;
        break;
      // Add more cases as needed for other properties
      default:
        break;
    }
  });
  const [inputValue, setInputValue] = useState(property.value);
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {property.label}
        {property.require && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Textarea placeholder={property.placeholder} rows={property.rows} style={{
        fontcolor: property.fontcolor,
        fontSize: property.fontsize + "px",
        height: property.height + "px",
        width: property.width + "px",
      }}
      value={inputValue}
      onChange={handleChange}
      />
    </div>
  )
}

export const TextAreaFormElement = {
  type: "textarea",
  icon: BsTextareaResize,
  label: "Text Area"
}


export function TextAreaProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const entityData = useSelector((state) => state.entitydata);
  const viewData = useSelector((state) => state.viewdata);
  const expressionData = useSelector((state) => state.expressiondata);
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      required: property.required,
      placeholder: property.placeholder,
      rows: property.rows,
      disable : property.disable,
      hide : property.hide,
      fontcolor: property.fontcolor,
      fontsize: property.fontsize,
      height: property.height,
      width: property.width,
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
      required: property.required,
      placeholder: property.placeholder,
      rows: property.rows,
      disable : property.disable,
      hide : property.hide,
      fontcolor: property.fontcolor,
      fontsize: property.fontsize,
      height: property.height,
      width: property.width,
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

        <FormField
          control={form.control}
          name="disable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disable</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select expression">
                      {field.value === false ? "No" : (expressionData?.find(item => JSON.stringify(item.conditions) === JSON.stringify(field.value))?.expressionname)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"false"}>No</SelectItem>
                    {expressionData?.map((item) => (
                      <SelectItem key={item.expression_id} value={JSON.stringify(item.conditions)}>
                        {item.expressionname}
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

        {/* ==================================== */}

        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TextArea width (px)</FormLabel>
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TextArea height (px)</FormLabel>
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
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rows</FormLabel>
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
        {/* ==================================== */}

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
        <div className="w-full flex items-center justify-center">
          <Button type='button' className='w-[40%]' onClick={handleReset}>
            Reset 
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TextAreaField;