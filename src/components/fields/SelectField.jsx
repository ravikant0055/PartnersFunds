import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { RxDropdownMenu } from "react-icons/rx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

const AttributesData = {
    label: "Select Field",
    labelposition: false,
    required: false,
    placeholder: "Select",
    options: [],
    disable: false,
    value: "",
    fontsize: "16px", // Default font color
    height: 20, // Default height
    width: "200px", // Default width
}


const SelectField = ({ id }) => {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!property || property.id !== id) {
            dispatch(addprop({ id, ...AttributesData }));
        }
    }, [dispatch, id, property]);

    return (
        <div className={`${property.labelposition ? 'flex flex-col' : 'flex items-center'} gap-2 w-full`} style={{
            width: property.width + "px",
        }} >
            <Label className='text-nowrap' style={{
                fontSize: property.fontsize + "px",
                height: property.height + "px",
            }} >
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <Select>
                <SelectTrigger className='border-black'>
                    <SelectValue placeholder={property.placeholder} />
                </SelectTrigger>
            </Select>
        </div>
    )
}

export function SelectFieldsPreview({ id }) {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const attributePropData = useSelector((state) => state.propertiesdata);
    const dispatch = useDispatch();

    console.log("disable prop value", property.disable);
    console.log("disable json prop value", JSON.parse(property.disable));
    console.log("attributePropData", attributePropData);
    console.log("selected value preview", property.value);


    //const shouldDisable = property.disable!== "no" && property.disable === "1108";
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

    console.log("shouldDisable:", shouldDisable);


    return (
        <div className={`${property.labelposition ? 'flex flex-col' : 'flex items-center'} gap-2 w-full`} style={{ width: property.width + "px", }}>
            <Label className='text-nowrap' style={{
                fontSize: property.fontsize + "px",
                height: property.height + "px",
            }}>
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <Select
                disabled={shouldDisable}
                value={property.value}
                onValueChange={(value) => dispatch(updateprop({ id, value }))}
            >
                <SelectTrigger>
                    <SelectValue placeholder={property.placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {property.options.map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export function SelectFieldsPage({ id, properties, submitValues }) {
    console.log("txt id", id);
    const [values, setValues] = useState("");
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
            case "options":
                property.options = JSON.parse(item.property_value.replace(/([A-Za-z])/g, '"$1"'))
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
            default:
                break;
        }
    });
    return (
        <div className='flex flex-col gap-2 w-full' style={{
            width: property.width + "px",
        }} >
            <Label style={{
                fontSize: property.fontsize + "px",
                height: property.height + "px",
            }}>
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder={property.placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {property.options.map((item) => (
                        <SelectItem key={item} value={item} >
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}


export const SelectFieldFormElement = {
    type: "selectfield",
    icon: RxDropdownMenu,
    label: "Select Field"
}


export function SelectFieldProperties({ id }) {
    const dispatch = useDispatch();
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const expressionData = useSelector((state) => state.expressiondata);
    console.log("expData", expressionData.length);
    console.log("property data", property);

    const form = useForm({
        mode: "onSubmit",
        defaultValues: {
            id: id,
            label: property.label,
            labelposition: property.labelposition,
            required: property.required,
            placeholder: property.placeholder,
            options: property.options,
            disable: property.disable,
            fontsize: property.fontsize,
            height: property.height,
            width: property.width,
        },
    });

    useEffect(() => {  // Reset form values to default when the component mounts
        form.reset({
            label: property.label,
            labelposition: property.labelposition,
            required: property.required,
            placeholder: property.placeholder,
            options: property.options,
            disable: property.disable,
            fontsize: property.fontsize,
            height: property.height,
            width: property.width,
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
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex justify-between items-center'>
                                <FormLabel>Option</FormLabel>
                                <Button
                                    variant={"outline"}
                                    className="py-2 px-2 h-fit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        form.setValue("options", field.value.concat("New Option"));
                                    }}
                                >
                                    <AiOutlinePlus />
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
                    name="fontsize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>FontSize</FormLabel>
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
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select height (px)</FormLabel>
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
                            <FormLabel>Select width (px)</FormLabel>
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
                <div className="w-full flex items-center justify-center">
                    <Button type='button' className='w-[40%]' onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default SelectField;