import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { BsCalendarDate } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addprop, updateprop } from '../../store/AttributePropDataSlice';
import { DayPicker } from 'react-day-picker'; // Use DayPicker instead of Calendar
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from 'src/lib/utils';
import { Button } from '../ui/button'; // Make sure to import Button from your UI library
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AttributesData = {
  label: "Date field",
  required: false,
};

const DateField = ({ id , x , y }) => {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;

  useEffect(() => {
    if (!property || property.id !== id) {
      dispatch(addprop({ id,x,y, ...AttributesData }));
    }
  }, [dispatch, id, property]);

  return (
    <div className='main-div'>
      <Label>
        {property.label}
        {property.required && <span className='required-css'> *</span>}
      </Label>
      <Button variant={"outline"} className='date-btn'>
        <CalendarIcon className='date-btn-icon' />
        <span>Pick a date</span>
      </Button>
    </div>
  );
};

export function DateFieldsPreview({ id }) {
  const [date, setDate] = useState(null);
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn('w-full justify-start text-left font-normal', !date && "text-muted-foreground")}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DateFieldsPage({ id, properties }) {
  const [date, setDate] = useState(null);
  const property = properties;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {property.label}
        {property.required && <span className='text-red-600 font-bold'> *</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn('w-full justify-start text-left font-normal', !date && "text-muted-foreground")}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const DateFieldFormElement = {
  type: "datefield",
  icon: BsCalendarDate,
  label: "Date Field",
};

export function DateProperties({ id }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertiesdata.find(item => item.id === id)) || AttributesData;

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      id: id,
      label: property.label,
      required: property.required,
    },
  });

  useEffect(() => {
    form.reset({
      label: property.label,
      required: property.required,
    });
  }, [form, property]);

  const applyChanges = (formData) => {
    const existingProperty = property.id;
    if (existingProperty) {
      dispatch(updateprop({ id, ...formData }));
    } else {
      dispatch(addprop({ id, ...formData }));
    }
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Id</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  disabled
                  className='prop-area'
                  {...field}
                  value={id}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label' >Label</FormLabel>
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
          name="required"
          render={({ field }) => (
            <FormItem className='prop-div'>
              <FormLabel className='prop-label'>Required</FormLabel>
              <FormControl>
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                  <SelectTrigger className='prop-area'>
                    <SelectValue placeholder={field.value ? 'Yes' : 'No'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

      </form>
    </Form>
  );
}

export default DateField;
