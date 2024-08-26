import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel  } from '../ui/form';
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from '../ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
  label: "Text Area",
  labelposition: false,
  require: true,
  disable:false,
  hide:false,
  readonly: false,
  autofocus:false,
  placeholder: "value here...",
  rows: 3,
  cols: 3,
  maxlength : 20,
  minlength : 0,
  fontsize: "16px", // Default font size
  fontcolor: "", // Default font color
  height: 80, // Default height
  width: 250, // Default width
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

const TextAreaField = ({ id , x , y }) => {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id,x,y, ...AttributesData }));
    }
  }, [dispatch, id, property]);

  return (
    <div className='main-div'>
      <Label>
        {property.label}
        {property.required && <span className='required-css'> *</span>}
      </Label>

      <Textarea readOnly disabled placeholder={property.placeholder} rows={property.rows} style={{
        fontcolor: property.fontcolor,
        fontSize: property.fontsize + "px",
        height: property.height + "px",
        width: property.width + "px",
      }} className='border-css'
      />

    </div>
  )
}

export function TextAreaFieldPreview({ id }) {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const attributePropData = useSelector((state) => state.propertiesdata);
  const [inputValue, setInputValue] = useState(property.value);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update state to trigger re-render
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

  if (property.disable === "true") {
    var shouldYesdisable = true;
  } else {
    const enableConditions = property.disable !== false ? JSON.parse(property.disable) : [];
    var shouldDisable = enableConditions.length > 0 && !evaluateConditions(enableConditions, attributePropData);
  }


  if (property.hide === "true") {
    var shouldYeshide = true;
  } else {
    const hideConditions = property.hide !== false ? JSON.parse(property.hide) : [];
    var shouldHide = hideConditions.length > 0 && !evaluateConditions(hideConditions, attributePropData);
  }
  return (
    <div className={`${property.labelposition ? 'flex flex-col' : 'flex items-center'} gap-2 w-full ${shouldHide || shouldYeshide ? 'hidden' : ''}`}>
      <Label className="flex text-nowrap">
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Textarea disabled={shouldDisable || shouldYesdisable} autoFocus={property.autofocus} maxLength={property.maxlength} minLength={property.minlength} readOnly={property.readonly} placeholder={property.placeholder} cols={property.cols} rows={property.rows} style={{
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
      labelposition: property.labelposition,
      required: property.required,
      placeholder: property.placeholder,
      rows: property.rows,
      cols:property.cols,
      disable : property.disable,
      autofocus:property.autofocus,
      hide : property.hide,
      maxlength:property.maxlength,
      minlength:property.minlength,
      readonly: property.readonly,
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
      labelposition: property.labelposition,
      required: property.required,
      placeholder: property.placeholder,
      rows: property.rows,
      disable : property.disable,
      hide : property.hide,
      maxlength:property.maxlength,
      autofocus:property.autofocus,
      cols:property.cols,
      minlength:property.minlength,
      readonly: property.readonly,
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
              <FormLabel className='prop-label'>Label</FormLabel >
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
          name="labelposition"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label Position</FormLabel >
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
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
          name="placeholder"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>PlaceHolder</FormLabel >
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
          name="readonly"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Read Only</FormLabel >
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
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
          name="autofocus"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Auto Focus</FormLabel >
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Disable</FormLabel >
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
          name="eovo.EO.entityobject"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Entity Object Name</FormLabel >
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Entity Object Attribute</FormLabel >
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
          name="eovo.VO.viewobject"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>View Object Name</FormLabel >
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area'>
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>View Object Attribute</FormLabel >
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
          name="fontsize"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Font size</FormLabel >
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

        {/* ==================================== */}

        <FormField
          control={form.control}
          name="maxlength"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Max Length</FormLabel >
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
          name="minlength"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Min Length</FormLabel >
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
          name="width"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>TextArea width (px)</FormLabel >
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
          name="height"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>TextArea height (px)</FormLabel >
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
          name="rows"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Rows</FormLabel >
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
          name="cols"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Cols</FormLabel >
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
        {/* ==================================== */}

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Required</FormLabel >
              <FormControl>
                <Select value={field.value} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
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

        <div className="w-full flex items-center justify-center">
          <Button type='button' className='prop-reset-btn' onClick={handleReset}>
            Reset 
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TextAreaField;