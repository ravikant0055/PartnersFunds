import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { MdOutlineTitle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';

const AttributesData = {
    label: "TilesField",
    paragraph: "Provide essential information about each team-member, including their role",
    fontsize: 20,
    fontweight: 600,
    fontcolor: "",
    bgcolor: "",
    hide: false,
    tooltip: "",
    src: "",
    labelIcon: true,
    eovo: {
        VO: {
            viewobject: "",
            viewattribute: ""
        }
    },
    onclick: ""
}

const TilesField = ({ id, x, y }) => {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!property || property.id !== id) {
            dispatch(addprop({ id, x, y, ...AttributesData }));
        }
    }, [dispatch, id, property]);

    return (
        <div onClick={property.onclick} className='flex flex-col gap-4 w-full shadow-md p-4 rounded-lg' style={{ backgroundColor: property.bgcolor }}>
            <div className={`${property.labelIcon ? " " : "hidden"} flex flex-col gap-3`}>
                <Avatar className='hidden: ${true}'>
                    <AvatarImage src={"/assets/" + property.src} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label style={{
                    fontSize: property.fontsize + "px",
                    fontWeight: property.fontweight,
                    color: property.fontcolor,
                }}>
                    {property.label}
                </Label>
            </div>
            <p className='w-[150px]' style={{ color: property.fontcolor }}>{property.paragraph}</p>
        </div>
    )
}

export function TilesFieldPreview({ id }) {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const attributePropData = useSelector((state) => state.propertiesdata);
    console.log("click property",property.onclick);
    // function evaluateConditions(enableConditions, attributePropData) {
    //     return enableConditions.every((condition, index) => {
    //         const { attribute, operator, attvalues, parentOperator } = condition;
    //         const attrData = attributePropData.find(attr => attr.id === attribute);

    //         if (!attrData) return false; // Attribute not found in data, return false

    //         const attrValue = attrData.value;

    //         let conditionResult = false;
    //         switch (operator) {
    //             case "==":
    //                 conditionResult = attrValue === attvalues;
    //                 break;
    //             case "!=":
    //                 conditionResult = attrValue !== attvalues;
    //                 break;
    //             // Add other operators if needed
    //             default:
    //                 return false; // Unknown operator
    //         }

    //         if (index > 0 && parentOperator === "AND") {
    //             return evaluateConditions(enableConditions.slice(0, index), attributePropData) && conditionResult;
    //         } else if (index > 0 && parentOperator === "OR") {
    //             return evaluateConditions(enableConditions.slice(0, index), attributePropData) || conditionResult;
    //         }

    //         return conditionResult;
    //     });
    // }

    // if (property.hide === "true") {
    //     var shouldYeshide = true;
    // } else {
    //     const hideConditions = property.hide !== false ? JSON.parse(property.hide) : [];
    //     var shouldHide = hideConditions.length > 0 && !evaluateConditions(hideConditions, attributePropData);
    // }
    

    return (
        <div onClick={property.onclick} className='flex flex-col gap-4 w-full shadow-md p-4 rounded-lg' style={{ backgroundColor: property.bgcolor }}>
            <div className={`${property.labelIcon ? " " : "hidden"} flex flex-col gap-3`}>
                <Avatar className='hidden: ${true}'>
                    <AvatarImage src={"/assets/" + property.src} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label style={{
                    fontSize: property.fontsize + "px",
                    fontWeight: property.fontweight,
                    color: property.fontcolor,
                }}>
                    {property.label}
                </Label>
            </div>
            <p className='w-[150px]' style={{ color: property.fontcolor }}>{property.paragraph}</p>
        </div>
    )
}

export function TilesFieldPage({ id, properties, submitValues }) {
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

export const TilesFieldFormElement = {
    type: "tilesfield",
    icon: MdOutlineTitle,
    label: "Tile Field"
}


export function TilesFieldProperties({ id }) {
    const dispatch = useDispatch();
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const expressionData = useSelector((state) => state.expressiondata);
    const viewData = useSelector((state) => state.viewdata);
    const [labelIcon, setlabelIcon] = useState(property.labelIcon);
    console.log("property data", property);
    const form = useForm({
        mode: "onBlur",
        defaultValues: {
            label: property.label,
            hide: property.hide,
            tooltip: property.tooltip,
            fontsize: property.fontsize,
            fontweight: property.fontweight,
            fontcolor: property.fontcolor,
            src: property.src,
            labelIcon: property.labelIcon,
            paragraph: property.paragraph,
            bgcolor: property.bgcolor,
            eovo: {
                VO: {
                    viewobject: property.eovo.VO.viewobject,
                    viewattribute: property.eovo.VO.viewattribute,
                }
            },
            onclick: property.onclick
        },
    });

    useEffect(() => {  // Reset form values to default when the component mounts
        form.reset({
            label: property.label,
            hide: property.hide,
            fontsize: property.fontsize,
            fontweight: property.fontweight,
            tooltip: property.tooltip,
            fontcolor: property.fontcolor,
            src: property.src,
            labelIcon: property.labelIcon,
            paragraph: property.paragraph,
            bgcolor: property.bgcolor,
            eovo: {
                VO: {
                    viewobject: property.eovo.VO.viewobject,
                    viewattribute: property.eovo.VO.viewattribute,
                }
            },
            onclick: property.onclick
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
                    name="labelIcon"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Label Icon Hide</FormLabel>
                            <FormControl>
                                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                                    <SelectTrigger className='prop-area'>
                                        <SelectValue placeholder={field.value ? 'Yes' : 'No'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"true"}>Yes</SelectItem>
                                        <SelectItem value={"false"}>No</SelectItem>

                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="paragraph"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className='w-[130px] h-[140px]'
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {labelIcon === true && (
                    <>
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
                            name="src"
                            render={({ field }) => (
                                <FormItem className='prop-div'>
                                    <FormLabel className='prop-label'>Src</FormLabel>
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
                    </>
                )}

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

                <FormField
                    control={form.control}
                    name="onclick"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>onClick</FormLabel>
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
                    name="tooltip"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Tooltip</FormLabel>
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

                {/* ======================================== */}


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

                <FormField
                    control={form.control}
                    name="bgcolor"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Background Color</FormLabel>
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
                    name="fontcolor"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Font Color</FormLabel>
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

                {/* ======================================== */}
                <div className="w-full flex items-center justify-center">
                    <Button type='button' className='prop-reset-btn' onClick={handleReset}>
                        Reset
                    </Button>
                </div>

            </form>
        </Form>
    );
}

export default TilesField