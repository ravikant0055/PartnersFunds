import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { addentity } from 'src/store/EntittyObjectSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { addview, removeview } from 'src/store/ViewObjectSlice';
import { Textarea } from '../ui/textarea';
import { createView } from 'src/store/PageDataSlice';

const ViewobjectBtn = () => {
   
  const [viewlist, SetViewlist] = useState(false);

  const form = useForm({
    defaultValues: {
      viewname: '',
      voquery : '',
    },
  });

  const dispatch = useDispatch();
  const viewData = useSelector((state) => state.viewdata);

  const onSubmit = async (values) => {
    try {
      // console.log('Submitted values:', values);
      // dispatch(addview(values));
      const res = await dispatch(createView(values));
      const viewID = res.payload.view_object_id;
      const updatedFormDataWithID = {
        ...values,
        view_id: viewID,
      };
      console.log("view obej",updatedFormDataWithID);
      
      dispatch(addview(updatedFormDataWithID));
    } catch (error) {
      console.error('Error:', error);
    }
    form.reset({
      viewname: '',
      voquery : '',
    });
  };

  const removeView = (e) => {
    dispatch(removeview(e));
    console.log("remove view");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-10 justify-between items-center">
          <Button className="gap-2">
            <h1>View Object</h1>
            <AiOutlinePlus className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className='w-[500px]'>
        <DialogHeader>
          <DialogTitle>View Object</DialogTitle>
          <div className='flex justify-between items-center'>
              <DialogDescription>{!viewlist ? "Create view object" : "Total View List" }</DialogDescription>
              <Button onClick={()=>SetViewlist((prev)=>!prev)} variant={"white"} className='py-0 text-blue-600'>{!viewlist?"view list":"add view"}</Button>
          </div>    
        </DialogHeader>
         
        {
        !viewlist
        ?
        (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="viewname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>View Object Name</FormLabel>
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
              name="voquery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Query</FormLabel>
                  <FormControl>
                    <Textarea {...field} onKeyDown={(e) => {
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
        viewData?.map((item,index)=>(
          <div key={index}>
              <div className='flex gap-4 justify-between items-center'>
                <div className='flex gap-2 bg-slate-100 w-full px-2 py-1 rounded-sm'>
                  <h1>{index+1 +"."}</h1>
                  <h1>{item.viewname}</h1>
                </div>
                <div className='flex gap-5'>
                <CiEdit className="h-6 w-6 text-cyan-700 cursor-pointer" />
                <MdDelete onClick={() => removeView(item.view_id)} className="h-6 w-6 text-red-500 cursor-pointer" />
                </div>
              </div>
          </div>
         ))
        }

      </DialogContent>
    </Dialog>
  );
};

export default ViewobjectBtn;
