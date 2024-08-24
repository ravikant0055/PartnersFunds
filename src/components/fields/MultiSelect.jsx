import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { GoMultiSelect } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MultiSelect } from 'primereact/multiselect';

const AttributesData = {
  label: "Multi Select",
  fontsize: 16,
  fontweight: 500,
  fontcolor: "",
  hide:false,
  tooltip:"",
  cities : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ]
}

const MultiSelects = ({ id }) => {
  console.log("txt id", id);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const [selectedCities, setSelectedCities] = useState(null);
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
      <MultiSelect 
            value={selectedCities} 
            onChange={(e) => setSelectedCities(e.value)} 
            options={property.cities} 
            optionLabel="name" 
            display="chip" 
            placeholder="Select Cities" 
            maxSelectedLabels={3} 
            className="w-full md:w-20rem" 
      />
    </div>
  )
}

export function MultiSelectPreview({ id }) {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const attributePropData = useSelector((state) => state.propertiesdata);
  const [selectedCities, setSelectedCities] = useState(null);
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
  
  const hideConditions = property.hide !== false ? JSON.parse(property.hide) : [];
  const shouldHide = hideConditions.length > 0 && !evaluateConditions(hideConditions, attributePropData);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label 
        title={property.tooltip}
        className={`${shouldHide ? 'hidden' : ''}`}
        style={{
        fontSize: property.fontsize + "px",
        fontWeight: property.fontweight,
        color: property.fontcolor
      }}>
        {property.label}
      </Label>
      <MultiSelect 
            value={selectedCities} 
            onChange={(e) => setSelectedCities(e.value)} 
            options={property.cities} 
            optionLabel="name" 
            display="chip" 
            placeholder="Select Cities" 
            maxSelectedLabels={3} 
            className="w-full md:w-20rem" 
      />
    </div>
  )
}

export function MultiSelectsPage({ id, properties, submitValues }) {
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

export const MultiSelectsFormElement = {
  type: "multiselect",
  icon: GoMultiSelect,
  label: "Multi Select"
}


export function MultiSelectsProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const entityData = useSelector((state) => state.entitydata);
  const expressionData = useSelector((state) => state.expressiondata);
  const viewData = useSelector((state) => state.viewdata);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      label: property.label,
      hide: property.hide,
      tooltip:property.tooltip,
      fontsize: property.fontsize,
      fontweight: property.fontweight,
      fontcolor: property.fontcolor,
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label: property.label,
      hide: property.hide,
      fontsize: property.fontsize,
      fontweight: property.fontweight,
      tooltip:property.tooltip,
      fontcolor: property.fontcolor,
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
          name="tooltip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tooltip</FormLabel>
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
        {/* ======================================== */}


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

export default MultiSelects;