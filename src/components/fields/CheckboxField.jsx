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

const AttributesData = {
    label: "Checkbox",
    required: true,
}

const CheckboxFields = ({ id }) => {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const cid = `checkbox-${id}`;
    console.log("cid",cid);
    return (
        <div className='flex items-top space-x-2'>
            <Checkbox id={cid} />
            <div className='grid gap-1.5 leading-none'>
                <Label htmlFor={id}>
                    {property.label}
                    {property.required && <span className='text-red-600 font-bold'> *</span>}
                </Label>
            </div>
        </div>
    )
}

export function CheckboxPreview({ id }) {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div className='flex items-top space-x-2'>
            <Checkbox id={id} />
            <div className='grid gap-1.5 leading-none'>
                <Label htmlFor={id}>
                    {property.label}
                    {property.required && <span className='text-red-600 font-bold'> *</span>}
                </Label>
            </div>
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
            label: property.label,
            required: property.required,
        },
    });

    useEffect(() => {  // Reset form values to default when the component mounts
        form.reset({
            label: property.label,
            required: property.required,
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
            </form>
        </Form>
    );
}

export default CheckboxFields;