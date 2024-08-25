import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { TbChartBubble } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Chart } from 'react-google-charts';

const AttributesData = {
    label: "Bubblechart",
    description: "Jan-Aug 2024",
    chartData: [
        ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
        ['CAN', 80.66, 1.67, 'North America', 33739900],
        ['DEU', 79.84, 1.36, 'Europe', 81902307],
        ['DNK', 78.6, 1.84, 'Europe', 5523095],
        ['EGY', 72.73, 2.78, 'Middle East', 79716203],
        ['GBR', 80.05, 2, 'Europe', 61801570],
        ['IRN', 72.49, 1.7, 'Middle East', 73137148],
        ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
        ['ISR', 81.55, 2.96, 'Middle East', 7485600],
        ['RUS', 68.6, 1.54, 'Europe', 141850000],
        ['USA', 78.09, 2.05, 'North America', 307007000],
    ],
    options: {
        title: 'Fertility rate vs life expectancy in selected countries (2010). X=Life Expectancy, Y=Fertility, Bubble size=Population, Bubble color=Region',
        hAxis: { title: 'Life Expectancy' },
        vAxis: { title: 'Fertility Rate' },
        bubble: {
            textStyle: {
                fontSize: 12,
                fontName: 'Times-Roman',
                color: 'green',
                bold: true,
                italic: true,
            },
        },
    },
    width: "100%",
    height: "100%"
}

const BubbleChart = ({ id }) => {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    const dispatch = useDispatch();

    return (
        <div style={{ width: '900px', height: '500px' }}>
      <Chart
        chartType="BubbleChart"
        data={property.chartData}
        options={property.options}
        width={property.width}
        height={property.height}
        legendToggle
      />
    </div>
    )
}

export function BubblechartPreview({ id }) {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div style={{ width: '900px', height: '500px' }}>
        <Chart
          chartType="BubbleChart"
          data={property.chartData}
          options={property.options}
          width={property.width}
          height={property.height}
          legendToggle
        />
      </div>
    )
}

export const BubblechartFormElement = {
    type: "bubblechart",
    icon: TbChartBubble,
    label: "Bubble Chart"
}


export function BubblechartProperties({ id }) {
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
                    name="description"
                    render={({ field }) => (
                        <FormItem className='prop-div'>
                            <FormLabel className='prop-label'>Description</FormLabel>
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

            </form>
        </Form>
    );
}

export default BubbleChart;