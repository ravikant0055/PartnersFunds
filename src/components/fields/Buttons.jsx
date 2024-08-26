import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { RxButton } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { type } from '@testing-library/user-event/dist/type';

const AttributesData = {
  label: "Button",
  color: "", // Default color
  fontsize: 16, // Default font size
  fontcolor: "", // Default font color
  height: 35, // Default height
  width: 100, // Default width
  disable:false,
  hide:false,
  type:"",
  onclick: {
    type: "",          // Store the type here
    onclick_exp: "",
    onclick_db: "",
  },
}

const Buttons = ({ id, x, y }) => {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id,x,y, ...property }));
    }
  }, [id, property]);

  return (
    <div className='main-div'>
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
    console.log("onclick Clicked", property.onclick);
  };

  const submitbtn = () => {
    console.log("Submit Button Clicked");
  };
  const resetbtn = () => {
    console.log("Rest Button Clicked");
  };
  const buttonbtn = () => {
    console.log("My Button Clicked");
  };



  switch(property.type)
  {
    case "button" : buttonbtn();
                    break;
    case "submit" : submitbtn();
                    break;
    case "reset" : resetbtn();
                    break;
    default : <h1>please select type</h1>                                                                  
  }


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
        type={property.type}
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
      onclick: {
        type: property.onclick.type || "",  // Ensure type is set
        onclick_exp: property.onclick.onclick_exp || "",
        onclick_db: property.onclick.onclick_db || "",
      },
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
      onclick: {
        type: property.onclick.type || "",  // Ensure type is set
        onclick_exp: property.onclick.onclick_exp || "",
        onclick_db: property.onclick.onclick_db || "",
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

  // const handleOnclickChange = (value) => {
  //   setOnclick(value);
  //   form.setValue('onclick', value);
  // };

  // const handleOnclickExpChange = (value) => {
  //   // form.setValue('onclick_exp', value);
  //   form.setValue('onclick', value);
  // };

  // const handleOnclickDbChange = (e) => {
  //   const value = e.target.value;
  //   // form.setValue('onclick_db', value);
  //   form.setValue('onclick', value);
  // };

  const handleOnclickChange = (value) => {
    setOnclick((prevOnclick) => ({
      ...prevOnclick,
      type: value,
    }));
    form.setValue("onclick", {
      ...onclick,
      type: value,
    });
  };
  
  // Handle the change for the onClick expression
  const handleOnclickExpChange = (value) => {
    setOnclick((prevOnclick) => ({
      ...prevOnclick,
      onclick_exp: value,
    }));
    form.setValue("onclick", {
      ...onclick,
      onclick_exp: value,
    });
  };
  
  // Handle the change for the onClick DB function
  const handleOnclickDbChange = (e) => {
    const value = e.target.value;
    setOnclick((prevOnclick) => ({
      ...prevOnclick,
      onclick_db: value,
    }));
    form.setValue("onclick", {
      ...onclick,
      onclick_db: value,
    });
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
          name="type"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Button Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder={!field.value ? "select type" : field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="button">button</SelectItem>
                    <SelectItem value="submit">submit</SelectItem>
                    <SelectItem value="reset">reset</SelectItem>
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Disable</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder="select expression">
                      {field.value === false ? "No" : (expressionData?.find(item => JSON.stringify(item.conditions) === JSON.stringify(field.value))?.expressionname)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"true"}>Yes</SelectItem>
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
          name="hide"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Hide</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder="select expression">
                      {field.value === false ? "No" : (expressionData?.find(item => JSON.stringify(item.conditions) === JSON.stringify(field.value))?.expressionname)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"true"}>Yes</SelectItem>
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
          name="onclick"
          render={({ field }) => (
            <FormItem className="prop-div">
              <FormLabel className="prop-label">onClick</FormLabel>
              <FormControl>
                <Select value={field.value.type} onValueChange={handleOnclickChange}>
                  <SelectTrigger className="prop-area">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="onclickexp">Expression</SelectItem>
                    <SelectItem value="onclickdb">DB Function</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {onclick.type === "onclickexp" && (
          <FormField
            control={form.control}
            name="onclick_exp"
            render={({ field }) => (
              <FormItem className="prop-div">
                <FormLabel className="prop-label">onClick Expression</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={handleOnclickExpChange}>
                    <SelectTrigger className="prop-area">
                      <SelectValue placeholder="Select expression">
                        {field.value === false
                          ? "No"
                          : expressionData?.find(
                              (item) =>
                                JSON.stringify(item.conditions) ===
                                JSON.stringify(field.value)
                            )?.expressionname}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"false".toString()}>No</SelectItem>
                      {expressionData?.map((item) => (
                        <SelectItem
                          key={item.expression_id}
                          value={JSON.stringify(item.conditions)}
                        >
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

        {onclick.type === "onclickdb" && (
          <FormField
            control={form.control}
            name="onclick_db"
            render={({ field }) => (
              <FormItem className="prop-div">
                <FormLabel className="prop-label">onClick DB Function</FormLabel>
                <FormControl>
                  <Input
                    className="prop-area"
                    {...field}
                    type="text"
                    onChange={handleOnclickDbChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                    onFocus={(e) =>
                      e.currentTarget.setSelectionRange(
                        e.currentTarget.value.length,
                        e.currentTarget.value.length
                      )
                    }
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Button Colour</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Font size</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Font color</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Button height (px)</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Button width (px)</FormLabel>
              <FormControl>
                <Input
                  className='prop-area'
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

        <div className="w-full flex items-center justify-center">
          <Button type='button' className='prop-reset-btn' onClick={handleReset}>
            Reset
          </Button>
        </div>

      </form>
    </Form>
  );
}

export default Buttons;