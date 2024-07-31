import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { RxDropdownMenu } from "react-icons/rx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ImSpinner2 } from 'react-icons/im';

const AttributesData = {
    label: "Select Field",
    required: true,
    placeholder: "value here...",
    options: [],
    expression: true,
}

const SelectField = ({ id }) => {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label>
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder={property.placeholder} />
                </SelectTrigger>
            </Select>
        </div>
    )
}

export function SelectFieldsPreview({ id }) {
    console.log("txt id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label>
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder={property.placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {property.options.map((item) => (
                        <SelectItem key={item} value={item}>
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
    console.log("property data", property);

    const form = useForm({
        mode: "onSubmit",
        defaultValues: {
            id: id,
            label: property.label,
            required: property.required,
            placeholder: property.placeholder,
            options: property.options,
            expression : property.expression
        },
    });

    useEffect(() => {  // Reset form values to default when the component mounts
        form.reset({
            label: property.label,
            required: property.required,
            placeholder: property.placeholder,
            options: property.options,
            expression : property.expression
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
                

            <Dialog>
                <DialogTrigger> 
                    <div className='flex gap-10 justify-between items-center'>
                        <FormLabel>Expression</FormLabel>
                        <Button variant={"outline"} className="py-2 px-2 h-fit">
                            <AiOutlinePlus/>
                        </Button>
                    </div>            
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Element Expression</DialogTitle>
                        <DialogDescription>Create expression for your elements</DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                        <form className="space-y-2">
                            <div className='flex gap-5 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name="attribute"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Attribute</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="operator"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Operator</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="attvalues"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Values</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                
                                <Button variant={"outline"} className="py-2 px-2 mt-8 h-fit">
                                    AND
                                </Button>

                                <Button variant={"outline"} className="py-2 px-2 mt-8 h-fit">
                                    OR
                                </Button>

                            </div>
                        </form>
                    </Form>

                    <DialogFooter>
                        <Button control={form.control} disabled={form.formState.isSubmitting} className="w-full mt-4">
                            {!form.formState.isSubmitting ? <span>Save</span> : <ImSpinner2 className="animate-spin" />}
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>

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
                                <AiOutlinePlus/>
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
                                            newOptions.splice(index,1);
                                            field.onChange(newOptions);
                                         }}
                                        >
                                            <AiOutlineClose/>
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

export default SelectField;