import React, { useState } from 'react';
import { Button } from '../ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { ImSpinner2 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { IoClose } from "react-icons/io5";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const ExpressionBtn = () => {
  const [conditions, setConditions] = useState([{ attribute: '', operator: '', attvalues: '', parentOperator: null }]);
 
  const arr=["button","input","radio"];
  const operator=["equal","not equal","*"];
  const myvalue=["a","b","c"];

  const form = useForm({
    defaultValues: {
      expressionname: '',
      conditions,
    },
  });

  const applyChanges = (formdata) => {
    const updatedFormData = {
      ...formdata,
      conditions: conditions.map((item) => ({ ...item })),
    };
    console.log("form data", updatedFormData);
  };

  const handleConditionChange = (index, field, value) => {
    setConditions((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      )
    );
  };

  const addCondition = (index, parentOperator) => {
    setConditions((prevConditions) => [
      ...prevConditions.slice(0, index + 1),
      { attribute: '', operator: '', attvalues: '', parentOperator },
      ...prevConditions.slice(index + 1),
    ]);
  };

  const removeCondition = (index) => {
    setConditions((prevConditions) =>
      prevConditions.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className='flex gap-10 justify-between items-center'>
          <Button variant={"outline"} className="gap-2">
            <h1>Expression</h1>
            <AiOutlinePlus className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Element Expression</DialogTitle>
          <DialogDescription>Create expression for your elements</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(applyChanges)}>
            <div className="scrollbar-hidden space-y-4 flex-1">

              <FormField
                control={form.control}
                name="expressionname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expression Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {conditions.map((condition, index) => (
                <div key={index} className="space-y-2">
                  {index > 0 && (
                    <p className="text-center text-blue-600">{condition.parentOperator}</p>
                  )}
                  <div className='flex gap-5 justify-center items-center'>
                    <FormField
                      control={form.control}
                      name={`conditions[${index}].attribute`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attribute</FormLabel>
                          <FormControl>
                            <Select value={condition.attribute} onValueChange={(value) => handleConditionChange(index, 'attribute', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {arr.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
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
                      name={`conditions[${index}].operator`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operator</FormLabel>
                          <FormControl>
                            <Select value={condition.operator} onValueChange={(value) => handleConditionChange(index, 'operator', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {operator.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
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
                      name={`conditions[${index}].attvalues`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Values</FormLabel>
                          <FormControl>
                            <Select value={condition.attvalues} onValueChange={(value) => handleConditionChange(index, 'attvalues', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {myvalue.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className='flex gap-4 mt-7 items-center'>
                      <Button type="button" onClick={() => addCondition(index, 'AND')} variant={"outline"} className="py-2 px-2 h-fit">
                        AND
                      </Button>

                      <Button type="button" onClick={() => addCondition(index, 'OR')} variant={"outline"} className="py-2 px-2 h-fit">
                        OR
                      </Button>

                      {index > 0 && (
                        <Button type="button" onClick={() => removeCondition(index)} variant={"white"} className="py-2 px-2 h-fit">
                          <IoClose className='text-red-600 text-xl' />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-4">
                {!form.formState.isSubmitting ? <span>Save</span> : <ImSpinner2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpressionBtn;
