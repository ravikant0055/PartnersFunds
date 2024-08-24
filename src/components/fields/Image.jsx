import React, { useEffect } from 'react'
import { CiImageOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { useDispatch } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import '../../index.css'

const AttributesData = {
    label: "Image",
    required: true,
    src: "",
    alt:"image",
    tooltip:"image",
    height: 85, // Default height
    width: 85, // Default width
}

const Image = ({ id }) => {

    console.log("img id", id);
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label
            >
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>
            <img src={"/assets/"+property.src} alt={property.alt} title={property.tooltip} style={{width:property.width+"px", height:property.height+"px"}}/>
        </div>
    )
}
export function ImageFieldPreview({ id }) {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div title={property.tooltip} className='flex flex-col gap-2 w-full'>
            <Label>
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>

            <img src={"/assets/"+property.src} alt={property.alt} title={property.tooltip} style={{width:property.width+"px", height:property.height+"px"}} />

        </div>
    )
}

// image save 

export function ImageFieldPage({ id, properties, submitValues }) {

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

    const previewImage = (e) => {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = ''; // Clear the current preview
        const file = e.target.files[0];
        if (file) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src); // Clean up
            imagePreview.appendChild(img);
        } else {
            imagePreview.innerHTML = '<span>No image selected</span>';
        }
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <Label>
                {property.label}
                {property.required && <span className='text-red-600 font-bold'> *</span>}
            </Label>

            <div style={{ position: 'relative', width: property.width + 'px', height: property.height + 'px' }}>
                <div id="imagePreview"
                    style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden', // Hide overflowing parts of the image
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5', // Add a background color to visualize the container
                    }}
                >
                    <span>No image selected</span>
                </div>
                <Input type="file" id="imageUpload" name="image" accept="image/*"
                    onChange={previewImage}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                    }}
                />
            </div>
        </div>
    )
}

export const ImageFormElement = {
    type: "image",
    icon: CiImageOn,
    label: "Image"
}


export function ImageProperties({ id }) {
    const dispatch = useDispatch();
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    console.log(" image property data", property);

    const form = useForm({
        mode: "onBlur",
        defaultValues: {
            id: id,
            label: property.label,
            required: property.required,
            color: property.color,
            src:property.src,
            alt:property.alt,
            tooltip:property.tooltip,
            fontsize: property.fontsize,
            fontcolor: property.color,
            height: property.height,
            width: property.width,
        },
    });

    useEffect(() => {  // Reset form values to default when the component mounts
        form.reset({
            label: property.label,
            required: property.required,
            color: property.color,
            src:property.src,
            alt:property.alt,
            ttooltip:property.tooltip,
            fontcolor: property.fontcolor,
            fontSize: property.fontsize,
            height: property.height,
            width: property.width


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
                    name="src"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Src</FormLabel>
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
                    name="alt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alt</FormLabel>
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

                {/* ====================================== */}



                <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image height (px)</FormLabel>
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
                            <FormLabel>Image width (px)</FormLabel>
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

                {/* ====================================== */}

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

                <div className="w-full flex items-center justify-center">
                    <Button type='button' className='w-[40%]' onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    );
}


export default Image