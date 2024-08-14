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
import { useDispatch, useSelector } from 'react-redux';
import { addexp, removeexp } from '../../store/ExpressionSlice';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { createExpression } from '../../store/PageDataSlice';
import { useNavigate } from 'react-router-dom';



const ExpressionBtn = () => {
  const [conditions, setConditions] = useState([{ attribute: '', operator: '', attvalues: '', parentOperator: null }]);
  const [isExplist, SetIsExplist] = useState(false);
  const expressionData = useSelector((state) => state.expressiondata);
  const attributeData = useSelector((state) => state.propertiesdata);


 console.log("expresion data :",expressionData);
 
  const operator = ["*", "is", "is not", "==", "!=", "<", ">"];

  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      expressionname: '',
      conditions,
    },
  });

  const removeExpression = (expId) => {
    console.log("exp del id" ,expId);
    dispatch(removeexp(expId));
  }

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = conditions.map((condition, i) =>
      i === index ? { ...condition, [field]: value } : condition
    );

    setConditions(updatedConditions);
    form.setValue('conditions', updatedConditions); // Update form's condition state
  };

  const addCondition = (index, parentOperator) => {
    const newCondition = { attribute: '', operator: '', attvalues: '', parentOperator };
    const updatedConditions = [
      ...conditions.slice(0, index + 1),
      newCondition,
      ...conditions.slice(index + 1),
    ];

    setConditions(updatedConditions);
    form.setValue('conditions', updatedConditions); // Update form's condition state
  };

  const removeCondition = (index) => {
    const updatedConditions = conditions.filter((_, i) => i !== index);

    setConditions(updatedConditions);
    form.setValue('conditions', updatedConditions); // Update form's condition state
  };

  const applyChanges = async (formdata) => {
    console.log("form data", formdata);

    try {
      const res = await dispatch(createExpression(formdata));
      console.log("my expression api response", res);
      const expID = res.payload.expression_ID;

      console.log("epxres api resp",res);
      console.log("epxres api resp exp id",expID);
      

      const updatedFormDataWithID = {
        ...formdata,
        expression_id: expID,
      };
      console.log("MY EXP FORM", updatedFormDataWithID);
      dispatch(addexp(updatedFormDataWithID));
    } catch (error) {
      console.error("Error creating attribute:", error);
    }

    form.reset({
      expressionname: '',
      conditions: [{ attribute: '', operator: '', attvalues: '', parentOperator: null }],
    });
    setConditions([{ attribute: '', operator: '', attvalues: '', parentOperator: null }]);
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
        
        {

        attributeData.length !== 0 
        ? 
        ( <>
          <DialogHeader>
            <DialogTitle>Element Expression</DialogTitle>
            <div className='flex justify-between items-center'>
              <DialogDescription>{!isExplist ? "Create expression for your elements" : "Total Expression List" }</DialogDescription>
              <Button onClick={()=>SetIsExplist((prev)=>!prev)} variant={"white"} className='py-0 text-blue-600'>{!isExplist ? "view list" : "add exp"}</Button>
            </div>
          </DialogHeader>
          {!isExplist ? (
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
                    <div className='flex gap-5  items-center'>
                      <FormField
                        control={form.control}
                        name={`conditions[${index}].attribute`}
                        render={({ field }) => (
                          <FormItem >
                            <FormLabel>Attribute</FormLabel>
                            <FormControl>
                              <Select value={condition.attribute} onValueChange={(value) => handleConditionChange(index, 'attribute', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {attributeData?.map((item) => (
                                      <SelectItem key={item.id} value={item.id}>
                                          {item.label}
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
                              <Select value={condition.operator}  onValueChange={(value) => handleConditionChange(index, 'operator', value)}>
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
                              <Input {...field} onChange={(e) => {
                                field.onChange(e);
                                handleConditionChange(index, 'attvalues', e.target.value);
                              }} />
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
                <DialogTrigger asChild>
                  <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-4">
                    {!form.formState.isSubmitting ? <span>Save</span> : <ImSpinner2 className="animate-spin" />}
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </form>
          </Form>
          )
          :
          (
            expressionData?.map((item,index)=>(
              <div key={index}>
                  <div className='flex gap-4 justify-between items-center'>
                    <div className='flex gap-2 bg-slate-100 w-full px-2 py-1 rounded-sm'>
                      <h1>{index+1 +"."}</h1>
                      <h1>{item.expressionname}</h1>
                    </div>
                    <div className='flex gap-5'>
                    <CiEdit className="h-6 w-6 text-cyan-700 cursor-pointer" />
                    <MdDelete onClick={() => removeExpression(item.expression_id)} className="h-6 w-6 text-red-500 cursor-pointer" />
                    </div>
                  </div>
              </div>
            ))
          )
          }
          </>
        )
        : 
        (
          <>
            <DialogHeader>
            <DialogTitle>Please add attribute first</DialogTitle>
            </DialogHeader>

            <DialogFooter>
                  <DialogTrigger asChild>
                    <Button>OK</Button>
                  </DialogTrigger>
            </DialogFooter>
          </>
        )  
        }
        
      </DialogContent>
    </Dialog>
  );
};

export default ExpressionBtn;
