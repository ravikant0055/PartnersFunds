import React, { useState } from 'react';
import { HiSaveAs } from "react-icons/hi";
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { addPageAsync } from '../../store/PageDataSlice';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const SaveFormBtn = ({ id }) => {

  const dispatch = useDispatch();
     
  const myData = useSelector((state) => state.attribute);
  console.log("myData", myData);
  
  const property = useSelector((state) => state.propertiesdata);
  console.log("property", property);
  
  const page = useSelector((state) => state.savepage);
  
  const [loading, setLoading] = useState(false);  // Add loading state

  const mergedArray = myData.map(item => {
    const { id, ...propertyData } = property.find(prop => prop.id === item.id) || {};
    return {
      id: item.id,
      type: item.type,
      properties: propertyData || {}
    };
  });

  const navigate = useNavigate();

  const formContent = async () => {
    setLoading(true);  // Set loading to true when the request starts
    try {
      const JsonElements = JSON.stringify(mergedArray);
      const postdata = {
        pageId: id,
        JsonElements: JsonElements
      }
      await dispatch(addPageAsync(postdata));  // Wait for the dispatch to complete
      setLoading(false);  // Set loading to false after the request is complete
      navigate(`/`);  // Navigate after data is saved
    } catch (error) {
      setLoading(false);  // Set loading to false in case of an error
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }; 
  
  return (
    <Dialog>
      <DialogTrigger>
        <div className='flex gap-10 justify-between items-center'>
          <Button variant={"outline"} className="gap-2">
            <HiSaveAs className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className='w-[500px]'>
        <DialogHeader>
          <DialogTitle>Are you sure you want to save this page?</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          {loading ? (  // Show the Loading component while loading
            navigate(`/loading`)
          ) : (
            <Button onClick={formContent}>Yes</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SaveFormBtn;
