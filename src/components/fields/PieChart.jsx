import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { BsPieChartFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Pie, PieChart } from "recharts"

const AttributesData = {
  label: "Piechart",
  description : "Jan-Aug 2024",
  chartData   : [
                    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
                    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
                    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
                    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
                    { browser: "other", visitors: 90, fill: "var(--color-other)" },
                ]
}



const chartConfig = {
    visitors : { label: "Visitors", },
    chrome   : { label: "Chrome",  color: "hsl(var(--chart-1))", },
    safari   : { label: "Safari",  color: "hsl(var(--chart-2))", },
    firefox  : { label: "Firefox", color: "hsl(var(--chart-3))", },
    edge     : { label: "Edge",    color: "hsl(var(--chart-4))", },
    other    : { label: "Other",   color: "hsl(var(--chart-5))", },
}

const Piechart = ({ id }) => {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
    useEffect(() => {
        if (!property || property.id !== id) {
          dispatch(addprop({ id, ...AttributesData }));
      }
  }, [dispatch, id, property]);
  
  return (
    <div className='flex flex-col gap-2 w-[350px]'>
            <Card className="flex flex-col">

                <CardHeader className="items-center pb-0">
                    <CardTitle>{property.label}</CardTitle>
                    <CardDescription>{property.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
                            />
                            <Pie
                                data={property.chartData}
                                dataKey="visitors"
                                labelLine={false}
                                label={({ payload, ...props }) => {
                                    return (
                                        <text
                                            cx={props.cx}
                                            cy={props.cy}
                                            x={props.x}
                                            y={props.y}
                                            textAnchor={props.textAnchor}
                                            dominantBaseline={props.dominantBaseline}
                                            fill="hsla(var(--foreground))"
                                        >
                                            {`${chartConfig[payload.browser]
                                                    ?.label
                                                } (${payload.visitors})`}
                                        </text>
                                    )
                                }}
                                nameKey="browser"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export function PiechartPreview({ id }) {
    const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
    return (
        <div className='flex flex-col gap-2 w-[350px]'>
            <Card className="flex flex-col">

                <CardHeader className="items-center pb-0">
                    <CardTitle>{property.label}</CardTitle>
                    <CardDescription>{property.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
                            />
                            <Pie
                                data={property.chartData}
                                dataKey="visitors"
                                labelLine={false}
                                label={({ payload, ...props }) => {
                                    return (
                                        <text
                                            cx={props.cx}
                                            cy={props.cy}
                                            x={props.x}
                                            y={props.y}
                                            textAnchor={props.textAnchor}
                                            dominantBaseline={props.dominantBaseline}
                                            fill="hsla(var(--foreground))"
                                        >
                                            {`${chartConfig[payload.browser]
                                                ?.label
                                                } (${payload.visitors})`}
                                        </text>
                                    )
                                }}
                                nameKey="browser"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
    </div>
  )
}

export const PiechartFormElement = {
  type: "piechart",
  icon:  BsPieChartFill ,
  label: "Pie Chart"
}


export function PiechartProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      label       : property.label,
      description : property.description,
      chartData   : property.chartData
    },
  });

  useEffect(() => {  // Reset form values to default when the component mounts
    form.reset({
      label       : property.label,
      description : property.description,
      chartData   : property.chartData
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

export default Piechart;