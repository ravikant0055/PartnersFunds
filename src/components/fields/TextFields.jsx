import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { MdTextFields } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from '../ui/use-toast';

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
  labelposition: false,
  disable: false,
  value: ""
}

const TextFields = ({ id }) => {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
  
  useEffect(() => {
        if (!property || property.id !== id) {
          dispatch(addprop({ id, ...AttributesData }));
      }
  }, [dispatch, id, property]);

  return (
    <div className={`${property.labelposition ? 'flex flex-col' : 'flex items-center'} gap-2 w-full`}>
      <Label
        style={{
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
      }} className='border-black' />
    </div>
  )
}

export function TextFieldsPreview({ id }) {
  console.log("txt id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const attributePropData = useSelector((state) => state.propertiesdata);
  const dispatch = useDispatch();

  console.log("Input preview value", property.value);

  const evaluateConditions = (conditions, data) => {
    if (!conditions || !conditions.length) return false;

    return conditions.reduce((result, condition) => {
      const attributeData = data.find(item => item.id === condition.attribute);
      if (!attributeData) return result;

      let conditionResult;
      switch (condition.operator) {
        case '==':
          conditionResult = attributeData.value === condition.attvalues;
          break;
        case '!=':
          conditionResult = attributeData.value !== condition.attvalues;
          break;
        case '>':
          conditionResult = attributeData.value > condition.attvalues;
          break;
        case '<':
          conditionResult = attributeData.value < condition.attvalues;
          break;
        // Add more operators as needed
        default:
          conditionResult = false;
      }

      if (condition.parentOperator === 'AND') {
        return result && conditionResult;
      } else if (condition.parentOperator === 'OR') {
        return result || conditionResult;
      } else {
        return conditionResult;
      }
    }, true);
  };

  const disableConditions = property.disable !== false ? JSON.parse(property.disable) : [];
  const shouldDisable = evaluateConditions(disableConditions, attributePropData);

  return (
    <div className={`${property.labelposition ? 'flex flex-col' : 'flex items-center'} gap-2 w-full`}>
      <Label
        style={{
          color: property.labelcolor,
          fontSize: property.labelsize + "px"
        }}
      >
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Input disabled={shouldDisable} placeholder={property.placeholder}
        value={property.value}
        onChange={(e) => dispatch(updateprop({ id, value: e.target.value }))}
        style={{
          color: property.color,
          fontcolor: property.fontcolor,
          fontSize: property.fontsize + "px",
          height: property.height + "px",
          width: property.width + "px",
        }}
      />
    </div>
  )
}

export function TextFieldsPage({ properties, id, submitValues }) {
  const [values, setValues] = useState("");
  console.log("txt id", id);
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
      case "labelcolor":
        property.labelcolor = item.property_value;
        break;
      case "labelsize":
        property.labelsize = item.property_value;
        break;
      case "textsize":
        property.textsize = item.property_value;
        break;
      case "textcolor":
        property.textcolor = item.property_value;
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
        onChange={(e) => setValues(e.target.value)}
        onBlur={(e) => {
          if (!submitValues) return;
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
  const expressionData = useSelector((state) => state.expressiondata);
  console.log("property data", property);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      labelposition: property.labelposition,
      required: property.required,
      disable: property.disable,
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
      labelposition: property.labelposition,
      required: property.required,
      disable: property.disable,
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
          name="labelposition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Position</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value ? 'Top' : 'Side'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Top</SelectItem>
                    <SelectItem value="false">Side</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger>
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
                    <SelectItem value={"false".toString()}>No</SelectItem>
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