import React, { useEffect } from 'react'
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

const AttributesData = {
    labelHeader: "Header Name",
    label: "Radio Field",
    required: true,
    options: ['Radio Button'],
    fontsize: "16px", // Default font size
    fontcolor: "", // Default font color
    height: "50px", // Default height
    width: "200px", // Default width
    fontweight: "200" //Default font weight
}

const RadioField = ({ id }) => {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const rid = `radio-${id}`;
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
            <RadioGroup defaultValue="option-one">
                {property.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={`option-${index}`} id={`radio-${id}-${index}`} />
                        <Label htmlFor={`radio-${id}-${index}`}
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
            <RadioGroup defaultValue="option-one">
                {property.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={`option-${index}`} id={`radio-${id}-${index}`} />
                        <Label htmlFor={`radio-${id}-${index}`}
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
    console.log("property data", property);

    const form = useForm({
        mode: "onSubmit",
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
            fontweight: property.fontweight
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
            fontweight: property.fontweight
        });
    }, [form, property]);


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
            <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
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

                {/* ======================================= */}
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
                {/* ======================================= */}

                <Button className="w-full" type='submit'>
                    save
                </Button>
            </form>
        </Form>
    );
}

export default RadioField;