import React, { useEffect } from 'react'
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

const AttributesData = {
    labelHeader: "Header Name",
    label: "Checkbox",
    required: true,
    options: ['Checkbox']
}

const CheckboxFields = ({ id }) => {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const cid = `checkbox-${id}`;
    console.log("cid",cid);
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label>
                    {property.labelHeader}
                    {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            {property.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox value={`option-${index}`} id={`checkbox-${id}-${index}`} />
                    <Label htmlFor={`checkbox-${id}-${index}`}>{option}</Label>
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
            <Label>
                    {property.labelHeader}
                    {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            {property.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox value={`option-${index}`} id={`checkbox-${id}-${index}`} />
                    <Label htmlFor={`checkbox-${id}-${index}`}>{option}</Label>
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
    console.log("property data", property);

    const form = useForm({
        mode: "onBlur",
        defaultValues: {
            id: id,
            labelHeader: property.labelHeader,
            label: property.label,
            required: property.required,
            options: property.options
        },
    });

    useEffect(() => {  // Reset form values to default when the component mounts
        form.reset({
            labelHeader: property.labelHeader,
            label: property.label,
            required: property.required,
            placeholder: property.placeholder,
            options: property.options
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

                <Button className="w-full" type='submit'>
                    save
                </Button>
            </form>
        </Form>
    );
}

export default CheckboxFields;