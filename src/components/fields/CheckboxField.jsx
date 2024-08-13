import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { IoMdCheckbox } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Checkbox } from '../ui/checkbox';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
    labelHeader: "Checkbox Header Name",
    label: "Checkbox",
    required: true,
    options: [],
    fontsize: "16px", // Default font size
    fontcolor: "", // Default font color
    height: "50px", // Default height
    width: "200px", // Default width
    fontweight: "200", //Default font weight
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

const CheckboxFields = ({ id }) => {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!property || property.id !== id) {
            dispatch(addprop({ id, ...AttributesData }));
        }
    }, [dispatch, id, property]);

    const cid = `checkbox-${id}`;
    console.log("cid", cid);
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label
                style={{
                    color: property.fontcolor,
                    fontSize: property.fontsize + "px",
                    height: property.height + "px",
                    width: property.width + "px",
                    fontWeight: property.fontweight
                }}
            >
                {property.labelHeader}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            {property.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox value={`option-${index}`} id={`checkbox-${id}-${index}`} name={option} style={{
                        color: property.fontcolor,
                        fontSize: property.fontsize + "px",
                        height: property.height + "px",
                        width: property.width + "px",
                        fontWeight: property.fontweight
                    }} />
                    <Label htmlFor={`checkbox-${id}-${index}`} style={{
                        color: property.fontcolor,
                        fontSize: property.fontsize + "px",
                        height: property.height + "px",
                        width: property.width + "px",
                        fontWeight: property.fontweight
                    }}>{option}</Label>
                </div>
            ))}
        </div>
    )
}

export function CheckboxPreview({ id }) {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label
                style={{
                    color: property.fontcolor,
                    fontSize: property.fontsize + "px",
                    height: property.height + "px",
                    width: property.width + "px",
                    fontWeight: property.fontweight
                }}
            >
                {property.labelHeader}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            {property.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox value={`option-${index}`} id={`checkbox-${id}-${index}`}
                        style={{
                            color: property.fontcolor,
                            fontSize: property.fontsize + "px",
                            height: property.height + "px",
                            width: property.width + "px",
                            fontWeight: property.fontweight
                        }} />
                    <Label htmlFor={`checkbox-${id}-${index}`}
                        style={{
                            color: property.fontcolor,
                            fontSize: property.fontsize + "px",
                            height: property.height + "px",
                            width: property.width + "px",
                            fontWeight: property.fontweight
                        }}
                    >{option}</Label>
                </div>
            ))}
        </div>
    )
}

export function CheckboxPage({ id, properties, submitValues }) {
    const property = AttributesData;
    console.log("txt id", id);
    // const [checkedItems, setCheckedItems] = useState([]);
    properties.forEach((item) => {
        switch (item.property_name) {
            case "labelHeader":
                property.labelHeader = item.property_value;
                break;
            case "label":
                property.label = item.property_value;
                break;
            case "required":
                property.required = item.property_value;
                break;
            case "options":
                property.options = item.property_value.slice(1, -1).split(',').map(item => item.trim());;
                break;
            case "fontsize":
                property.textsize = item.property_value;
                break;
            case "height":
                property.height = item.property_value;
                break;
            case "width":
                property.width = item.property_value;
                break;
            case "fontcolor":
                property.fontcolor = item.property_value;
                break;
            case "fontweight":
                property.fontweight = item.property_value;
                break;
            // Add more cases as needed for other properties
            default:
                break;
        }
    });
    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (event, option) => {
        console.log("option",event,option);
        
        setCheckedItems(prevCheckedItems => {
            const newCheckedItems = event
                ? [...prevCheckedItems, option]
                : prevCheckedItems.filter(item => item !== option);

            // Log the new state and values
            console.log("Checked Items:", newCheckedItems);

            if (submitValues) {
                submitValues(id, newCheckedItems); // Pass the updated checkedItems to submitValues
            }
        });
    };

    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label
                style={{
                    color: property.fontcolor,
                    fontSize: property.fontsize + "px",
                    height: property.height + "px",
                    width: property.width + "px",
                    fontWeight: property.fontweight
                }}
            >
                {property.labelHeader}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            {property.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox  id={`checkbox-${id}-${index}`}
                        onCheckedChange={(event) => handleCheckboxChange(event, option)}
                        style={{
                            fontWeight: property.fontweight
                        }}
                    />
                    <Label htmlFor={`checkbox-${id}-${index}`}
                        style={{
                            fontWeight: property.fontweight
                        }}
                    >{option}</Label>
                </div>
            ))}
        </div>
    )
}

export const CheckboxFormElement = {
    type: "checkbox",
    icon: IoMdCheckbox,
    label: "Checkbox"
}


export function CheckboxProperties({ id }) {
    const dispatch = useDispatch();
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const entityData = useSelector((state) => state.entitydata);
    const viewData = useSelector((state) => state.viewdata);
    console.log("property data", property);

    const form = useForm({
        mode: "onBlur",
        defaultValues: {
            id: id,
            labelHeader: property.labelHeader,
            label: property.label,
            required: property.required,
            options: property.options,
            fontcolor: property.fontcolor,
            fontsize: property.fontsize,
            height: property.height,
            width: property.width,
            fontweight: property.fontweight,
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
            labelHeader: property.labelHeader,
            label: property.label,
            required: property.required,
            placeholder: property.placeholder,
            options: property.options,
            fontcolor: property.fontcolor,
            fontsize: property.fontsize,
            height: property.height,
            width: property.width,
            fontweight: property.fontweight,
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
                    name="labelHeader"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label Header</FormLabel>
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

                <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex justify-between items-center'>
                                <FormLabel>Option</FormLabel>
                                <Button
                                    variant={"outline"}
                                    className="gap-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        form.setValue("options", field.value.concat("New Option"));
                                    }}
                                >
                                    <AiOutlinePlus />
                                    Add
                                </Button>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {form.watch("options").map((option, index) => (
                                    <div key={index} className='flex items-center justify-between gap-1'>
                                        <Input placeholder="" value={option} onChange={(e) => {
                                            field.value[index] = e.target.value;
                                            field.onChange(field.value);
                                        }}
                                        />
                                        <Button variant={"ghost"} size={"icon"} onClick={(e) => {
                                            e.preventDefault();
                                            const newOptions = [...field.value];
                                            newOptions.splice(index, 1);
                                            field.onChange(newOptions);
                                        }}
                                        >
                                            <AiOutlineClose />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="fontcolor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text color</FormLabel>
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
                {/* ======================== */}

                <div className="w-full flex items-center justify-center">
                    <Button type='button' className='w-[40%]' onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default CheckboxFields;