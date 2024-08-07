import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { IoAnalyticsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

const AttributesData = {
  label: "Linechart",
  description : "Jan-Aug 2024",
  chartData   : [
                    { month: "January", desktop: 186, mobile: 80 },
                    { month: "February", desktop: 305, mobile: 200 },
                    { month: "March", desktop: 237, mobile: 120 },
                    { month: "April", desktop: 73, mobile: 190 },
                    { month: "May", desktop: 209, mobile: 130 },
                    { month: "June", desktop: 214, mobile: 140 },
                ]
}

const chartConfig = {
  desktop: { label: "Desktop",  color: "hsl(var(--chart-1))",},
  mobile: {  label: "Mobile",  color: "hsl(var(--chart-2))",},
}

const Linechart = ({ id }) => {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  const dispatch = useDispatch();
    useEffect(() => {
        if (!property || property.id !== id) {
          dispatch(addprop({ id, ...AttributesData }));
      }
  }, [dispatch, id, property]);
  
  return (
    <div className='flex flex-col gap-2 w-[350px]'>
      <Card>
        <CardHeader>
            <CardTitle>{property.label}</CardTitle>
            <CardDescription>{property.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={property.chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
            </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export function LinechartPreview({ id }) {
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;
  return (
    <div className='flex flex-col gap-2 w-[350px]'>
      <Card>
        <CardHeader>
          <CardTitle>{property.label}</CardTitle>
          <CardDescription>{property.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={property.chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export const LinechartFormElement = {
  type: "linechart",
  icon: IoAnalyticsOutline,
  label: "Line Chart"
}


export function LinechartProperties({ id }) {
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

export default Linechart;