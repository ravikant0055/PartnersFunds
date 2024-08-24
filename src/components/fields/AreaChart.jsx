import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { AiOutlineAreaChart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Chart } from 'react-google-charts';

const AttributesData = {
    label: "Areachart",
    description: "Jan-Aug 2024",
    chartData: [
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540],
    ],
    options: {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
    },
    width: "100%",
    height: "100%"
}

const AreaChart = ({ id }) => {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const dispatch = useDispatch();

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Chart
                chartType="AreaChart"
                data={property.chartData}
                options={property.options}
                width={property.width}
                height={property.height}
                legendToggle
            />
        </div>
    )
}

export function AreachartPreview({ id }) {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Chart
                chartType="AreaChart"
                data={property.chartData}
                options={property.options}
                width={property.width}
                height={property.height}
                legendToggle
            />
        </div>
    )
}

export const AreachartFormElement = {
    type: "areachart",
    icon: AiOutlineAreaChart,
    label: "Area Chart"
}


export function AreachartProperties({ id }) {
    const dispatch = useDispatch();
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const form = useForm({
        mode: "onBlur",
        defaultValues: {
            label: property.label,
            description: property.description,
            chartData: property.chartData
        },
    });

    useEffect(() => {  // Reset form values to default when the component mounts
        form.reset({
            label: property.label,
            description: property.description,
            chartData: property.chartData
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
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

            </form>
        </Form>
    );
}

export default AreaChart;