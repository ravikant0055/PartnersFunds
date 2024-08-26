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

const AttributesData = {
  label: "Text field",
  required: true,
  placeholder: "value here...",
  labelcolor: "", // Default color
  labelsize: 16, // Default font size
  textsize: 16,
  textcolor: "", // Default font color
  height: 35, // Default height
  width: 150, // Default width
  type: "text",
  maxlength: 20,
  minlength: 0,
  pattern:"",
  labelposition: false,
  disable: false,
  hide: false,
  readonly: false,
  autofocus:false,
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


const TextFields = ({ id, x ,y }) => {
  console.log("x", x);
  console.log("y", y);
  // const {id , x , y} = element;
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id, x, y, ...AttributesData }));
    }
    else{
      
    }
  }, [dispatch, id, property]);

  return (
    <div className={`${property.labelposition ? 'labelposition-top' : 'labelposition-side'} labelposition-main-div`}>
      <Label
        style={{
          color: property.labelcolor,
          fontSize: property.labelsize + "px"
        }}
      >
        {property.label}
        {property.required && <span className='required-css'> *</span>}
      </Label>
      <Input readOnly disabled placeholder={property.placeholder} style={{
        fontSize: property.textsize + "px",
        color: property.textcolor,
        height: property.height + "px",
        width: property.width + "px",
      }} className='border-css' />
    </div>
  )
}

export function TextFieldsPreview({ id }) {
  console.log("txt id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const attributePropData = useSelector((state) => state.propertiesdata);
  const dispatch = useDispatch();

  console.log("property.disable : ", property.disable);
  console.log("Attribute prop data : ", attributePropData);

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
 
  if(property.disable === "true"){
       var shouldYesdisable = true;
  }else{  
    const enableConditions = property.disable !== false ? JSON.parse(property.disable) : [];
    var shouldDisable = enableConditions.length > 0 && !evaluateConditions(enableConditions, attributePropData);
  }


  if(property.hide === "true"){
    var shouldYeshide = true;
  }else{
    const hideConditions = property.hide !== false ? JSON.parse(property.hide) : [];
    var shouldHide = hideConditions.length > 0 && !evaluateConditions(hideConditions, attributePropData);
  }
  console.log("readonly:", property.readonly);


  return (
    <div className={`${property.labelposition ? 'flex flex-col' : 'flex items-center'} gap-2 w-full ${shouldHide || shouldYeshide ? 'hidden' : ''}`}>
      <Label
        style={{
          color: property.labelcolor,
          fontSize: property.labelsize + "px"
        }}
        className="flex text-nowrap"
      >
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Input
        pattern={property.pattern}
        autoFocus={property.autofocus}
        type={property.type}
        maxLength={property.maxlength}
        minLength={property.minlength}
        disabled={shouldDisable || shouldYesdisable}
        placeholder={property.placeholder}
        value={property.value}
        readOnly={property.readonly}
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
  const property = AttributesData;

  console.log("txt id", id);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update state to trigger re-render
    if (submitValues) {
      submitValues(id, newValue); // Update formValues
    }
  };


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
      case "value":
        property.value = item.property_value;
        break;
      case "disable":
        property.disable = item.property_value;
        break;
      case "hide":
        property.hide = item.property_value;
        break;
      default:
        break;
    }
  });

  // const disableConditions = property.disable !== false ? JSON.parse(property.disable) : [];
  // const shouldDisable = evaluateConditions(disableConditions, attributePropData);

  const [inputValue, setInputValue] = useState(property.value);
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
        value={inputValue} // Bind to state
        onChange={handleChange}

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
  const entityData = useSelector((state) => state.entitydata);
  const viewData = useSelector((state) => state.viewdata);

  console.log("entityData", entityData);

  console.log("property data", property);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      labelposition: property.labelposition,
      required: property.required,
      disable: property.disable,
      hide: property.hide,
      readonly: property.readonly,
      autofocus:property.autofocus,
      placeholder: property.placeholder,
      type: property.type,
      pattern:property.pattern,
      maxlength: property.maxlength,
      minlength: property.minlength,
      labelcolor: property.labelcolor,
      textsize: property.textsize,
      labelsize: property.labelsize,
      textcolor: property.textcolor,
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
      disable: property.disable,
      hide: property.hide,
      readonly: property.readonly,
      autofocus:property.autofocus,
      type: property.type,
      pattern:property.pattern,
      maxlength: property.maxlength,
      minlength: property.minlength,
      placeholder: property.placeholder,
      labelcolor: property.labelcolor,
      textcolor: property.textcolor,
      textsize: property.textsize,
      labelsize: property.labelsize,
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
        className="space-y-3">

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
          name="placeholder"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>PlaceHolder</FormLabel>
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
          name="pattern"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Pattern</FormLabel>
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
              <FormLabel className='prop-label'>Label Position</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger  className='prop-area'>
                    <SelectValue placeholder={field.value ? 'Top' : 'Side'} />
                  </SelectTrigger>
                  <SelectContent >
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
          name="type"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Input Type</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger  className='prop-area'>
                    <SelectValue placeholder={field.value ? 'Text' : 'Number'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
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
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Required</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger  className='prop-area'>
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
          name="readonly"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Read Only</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger  className='prop-area'>
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
          name="eovo.EO.entityobject"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Entity Object Name</FormLabel>
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
              <FormLabel className='prop-label'>Entity Object Attribute</FormLabel>
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
              <FormLabel className='prop-label'>View Object Name</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='prop-area' >
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
              <FormLabel className='prop-label'>View Object Attribute</FormLabel>
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



        {/* ====================================== */}

        <FormField
          control={form.control}
          name="autofocus"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Auto Focus</FormLabel>
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
          name="maxlength"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Max Length</FormLabel>
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
              <FormLabel className='prop-label'>Min Length</FormLabel>
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
          name="labelsize"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label Size</FormLabel>
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
          name="textsize"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Text Size</FormLabel>
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
          name="labelcolor"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Label Color</FormLabel>
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
          name="textcolor"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Text Color</FormLabel>
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
              <FormLabel className='prop-label'>Text height (px)</FormLabel>
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
              <FormLabel className='prop-label'>Text width (px)</FormLabel>
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

        {/* ====================================== */}



        <div className="w-full flex items-center justify-center">
          <Button type='button' className='prop-reset-btn' onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TextFields;