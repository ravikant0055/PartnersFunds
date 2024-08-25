import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { IoIosRadioButtonOn } from "react-icons/io";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
    labelHeader: "Radio Header Name",
    label: "Radio Field",
    required: true,
    options: [],
    fontsize: 16, // Default font size
    headercolor: "",
    radiocolor: "", // Default font color
    fontweight: 200, //Default font weight
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

const RadioField = ({ id , x , y }) => {
    
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!property || property.id !== id) {
            dispatch(addprop({ id,x,y, ...AttributesData }));
        }
    }, [dispatch, id, property]);
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label
                style={{
                    color: property.headercolor,
                    fontSize: property.fontsize + "px",
                    fontWeight: property.fontweight
                }}
            >
                {property.labelHeader}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <RadioGroup defaultValue="option-one" style={{
                color: property.radiocolor,
                fontSize: property.fontsize + "px",
                fontWeight: property.fontweight
            }}>
                {property.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={`option-${index}`} id={`radio-${id}-${index}`} />
                        <Label htmlFor={`radio-${id}-${index}`}

                        >{option}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export function RadioFieldsPreview({ id }) {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label
                style={{
                    color: property.headercolor,
                    fontSize: property.fontsize + "px",
                    fontWeight: property.fontweight
                }}
            >
                {property.labelHeader}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <RadioGroup defaultValue="option-one" style={{
                color: property.radiocolor,
                fontSize: property.fontsize + "px",
                fontWeight: property.fontweight
            }}>
                {property.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={`option-${index}`} id={`radio-${id}-${index}`} />
                        <Label htmlFor={`radio-${id}-${index}`}
                        >{option}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export function RadioFieldsPage({ id, properties, submitValues }) {
    const property = AttributesData;
    console.log("txt id", id);
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
            case "headercolor":
                property.headercolor = item.property_value;
                break;
            case "radiocolor":
                property.radiocolor = item.property_value;
                break;
            case "options":
                property.options = item.property_value.slice(1, -1).split(',').map(item => item.trim());
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
            case "fontweight":
                property.fontweight = item.property_value;
                break;
            // Add more cases as needed for other properties
            default:
                break;
        }
    });
    const [checkedItems, setCheckedItems] = useState(property.options);
    const handleRadioChange = (newValue) => {
        console.log("option",newValue);
        setCheckedItems(newValue); // Update state to trigger re-render
        if (submitValues) {
            submitValues(id, newValue); // Update formValues
        }
        
    };
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label
                style={{
                    color: property.headercolor,
                    fontSize: property.fontsize + "px",
                    fontWeight: property.fontweight
                }}
            >
                {property.labelHeader}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <RadioGroup defaultValue="option-one" 
            onValueChange={handleRadioChange}
            style={{
                color: property.radiocolor,
                fontSize: property.fontsize + "px",
                fontWeight: property.fontweight
            }}>
                {property.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option}
                         id={`radio-${id}-${index}`} />
                        <Label htmlFor={`radio-${id}-${index}`}
                        >{option}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export const RadioFieldFormElement = {
    type: "radiofield",
    icon: IoIosRadioButtonOn,
    label: "Radio Field"
}


export function RadioFieldProperties({ id }) {
    const dispatch = useDispatch();
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const entityData = useSelector((state) => state.entitydata);
    const viewData = useSelector((state) => state.viewdata);
    console.log("property data", property);

    const form = useForm({
        mode: "onSubmit",
        defaultValues: {
            id: id,
            labelHeader: property.labelHeader,
            label: property.label,
            required: property.required,
            options: property.options,
            headercolor: property.headercolor,
            radiocolor: property.radiocolor,
            fontsize: property.fontsize,
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
            headercolor: property.headercolor,
            radiocolor: property.radiocolor,
            fontsize: property.fontsize,
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
                }} className="space-y-3">
                <FormField
                    control={form.control}
                    name="labelHeader"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Label Header</FormLabel>
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
                    name="eovo.EO.entityobject"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Entity Object Name</FormLabel>
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

                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Required</FormLabel>
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
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex justify-between items-center'>
                                <FormLabel className='prop-label'>Option</FormLabel>
                                <Button
                                    variant={"outline"}
                                    className="gap-2 h-[30px] text-[12px]"
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
                                        <Input 
                                            className='prop-area' placeholder="" value={option} onChange={(e) => {
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

                {/* ======================================= */}
                <FormField
                    control={form.control}
                    name="headercolor"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Header Color</FormLabel>
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
                    name="radiocolor"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Radio Color</FormLabel>
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
                    name="fontweight"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Font Weight</FormLabel>
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
                    name="fontsize"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Font Size (px)</FormLabel>
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
                {/* ======================================= */}

                <div className="w-full flex items-center justify-center">
                    <Button type='button' className='prop-reset-div' onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default RadioField;