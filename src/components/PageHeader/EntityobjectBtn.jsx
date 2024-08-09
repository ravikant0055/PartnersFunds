import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { addentity, removeentity } from 'src/store/EntittyObjectSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { createEntity } from 'src/store/PageDataSlice';

const EntityobjectBtn = () => {
   
  const [entitylist, SetEntitylist] = useState(false);

  const form = useForm({
    defaultValues: {
      entityname: '',
      eotablename : '',
    },
  });

  const dispatch = useDispatch();
  const entityData = useSelector((state) => state.entitydata);

  console.log("my entity data:",entityData);
  

  const onSubmit = async (formvalue) => {
    try {
      const res = await dispatch(createEntity(formvalue));
      const entityID = res.payload.entity_object_id;
      const updatedFormDataWithID = {
        ...formvalue,
        entity_id: entityID,
      };
      dispatch(addentity(updatedFormDataWithID));
    }catch (error) {
      console.error("Error creating attribute:", error);
    }
    form.reset({
      entityname: '',
      eotablename : '',
    });
  };

  const removeEntity = (e) => {
    dispatch(removeentity(e));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-10 justify-between items-center">
          <Button className="gap-2">
            <h1>Entity Object</h1>
            <AiOutlinePlus className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entity Object</DialogTitle>
          <div className='flex justify-between items-center'>
              <DialogDescription>{!entitylist ? "Create entity object" : "Total Entity List" }</DialogDescription>
              <Button onClick={()=>SetEntitylist((prev)=>!prev)} variant={"white"} className='py-0 text-blue-600'>{!entitylist?"entity list":"add entity"}</Button>
          </div>    
        </DialogHeader>
         
        {
        !entitylist
        ?
        (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="entityname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity Object Name</FormLabel>
                  <FormControl>
                    <Input {...field} onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eotablename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Name</FormLabel>
                  <FormControl>
                    <Input {...field} onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}/>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full mt-4">
              {!form.formState.isSubmitting ? <span>Save</span> : <ImSpinner2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        )
        :
         entityData?.map((item,index)=>(
          <div key={index}>
              <div className='flex gap-4 justify-between items-center'>
                <div className='flex gap-2 bg-slate-100 w-full px-2 py-1 rounded-sm'>
                  <h1>{index+1 +"."}</h1>
                  <h1>{item.entityname}</h1>
                </div>
                <div className='flex gap-5'>
                <CiEdit className="h-6 w-6 text-cyan-700 cursor-pointer" />
                <MdDelete onClick={() => removeEntity(item.entity_id)} className="h-6 w-6 text-red-500 cursor-pointer" />
                </div>
              </div>
          </div>
         ))
        }

      </DialogContent>
    </Dialog>
  );
};

export default EntityobjectBtn;
