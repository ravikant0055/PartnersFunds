import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { RxButton } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
  label: "Button",
  color: "", // Default color
  fontsize: 16, // Default font size
  fontcolor: "", // Default font color
  height: 50, // Default height
  width: 200, // Default width
  disable:false,
  hide:false,
  onclick: ""
}

const Buttons = ({ id }) => {
  console.log("txt id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id, ...property }));
    }
  }, [id, property]);

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
  const attributePropData = useSelector((state) => state.propertiesdata);

  const alertFunc = () => {
    console.log("Button Clicked", property.onclick);
  };

  function evaluateConditions(enableConditions, attributePropData) {
    return enableConditions.every((condition, index) => {
      const { attribute, operator, attvalues, parentOperator } = condition;
      const attrData = attributePropData.find(attr => attr.id === attribute);
  
      if (!attrData) return false; // Attribute not found in data, return false
  
      const attrValue = attrData.value;
  
      let conditionResult = false;
      switch (operator) {
        case "==":
          conditionResult = attrValue === attvalues;
          break;
        case "!=":
          conditionResult = attrValue !== attvalues;
          break;
        // Add other operators if needed
        default:
          return false; // Unknown operator
      }
  
      if (index > 0 && parentOperator === "AND") {
        return evaluateConditions(enableConditions.slice(0, index), attributePropData) && conditionResult;
      } else if (index > 0 && parentOperator === "OR") {
        return evaluateConditions(enableConditions.slice(0, index), attributePropData) || conditionResult;
      }
  
      return conditionResult;
    });
  }
  
  const enableConditions  = property.disable !== false ? JSON.parse(property.disable) : []; 
  const shouldDisable = enableConditions.length > 0 && !evaluateConditions(enableConditions, attributePropData);
  
  const hideConditions = property.hide !== false ? JSON.parse(property.hide) : [];
  const shouldHide = enableConditions.length > 0 && !evaluateConditions(hideConditions, attributePropData);



  return (
    <div className='flex flex-col gap-2 w-full'>
      <Button
        disabled={shouldDisable}
        onClick={alertFunc}
        className={`${shouldHide ? 'hidden' : ''}`}
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

export function ButtonsPage({ id, properties, submitValues }) {
  const property = AttributesData;
  const alertFunc = () => {
    console.log("Button Clicked", property.onclick);
  };
  properties.forEach((item) => {
    switch (item.property_name) {
      case "label":
        property.label = item.property_value;
        break;
      case "color":
        property.color = item.property_value;
        break;
      case "fontcolor":
        property.fontcolor = item.property_value;
        break;
      case "fontsize":
        property.fontsize = item.property_value;
        break;
      case "height":
        property.height = item.property_value;
        break;
      case "width":
        property.width = item.property_value;
        break;
      case "onclick":
        property.onclick = item.property_value;
        break;
      // Add more cases as needed for other properties
      default:
        break;
    }
  });
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
  const expressionData = useSelector((state) => state.expressiondata);
  const [onclick, setOnclick] = useState(property.onclick);
  
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      color: property.color,
      disable:property.disable,
      hide:property.hide,
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
      disable:property.disable,
      hide:property.hide,
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

  const handleOnclickChange = (value) => {
    setOnclick(value);
    form.setValue('onclick', value);
  };

  const handleOnclickExpChange = (value) => {
    // form.setValue('onclick_exp', value);
    form.setValue('onclick', value);
  };

  const handleOnclickDbChange = (e) => {
    const value = e.target.value;
    // form.setValue('onclick_db', value);
    form.setValue('onclick', value);
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
          name="hide"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hide</FormLabel>
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
          name="onclick"
          render={({ field }) => (
            <FormItem>
              <FormLabel>onClick</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={handleOnclickChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'no'}>No</SelectItem>
                    <SelectItem value={'onclickexp'}>Expression</SelectItem>
                    <SelectItem value={'onclickdb'}>DB Function</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {onclick === 'onclickexp' && (
          <FormField
          control={form.control}
          name="onclick_exp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>onClick Expression</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={handleOnclickExpChange}
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
        )}

        {onclick === 'onclickdb' &&(
          <FormField
          control={form.control}
          name="onclick_db"
          render={({ field }) => (
            <FormItem>
              <FormLabel>onClick DB Function</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  onChange={handleOnclickDbChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        )}

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

        <div className="w-full flex items-center justify-center">
          <Button type='button' className='w-[40%]' onClick={handleReset}>
            Reset
          </Button>
        </div>

      </form>
    </Form>
  );
}

export default Buttons;