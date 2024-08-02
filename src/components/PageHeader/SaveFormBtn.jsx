import React, { useTransition } from 'react'
import { HiSaveAs } from "react-icons/hi";
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addpage, updatepage } from '../../store/SavePageSlice';
import { toast } from '../ui/use-toast';
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({ id }) => {
  const dispatch = useDispatch();
  const [loading, startTransition] = useTransition();
  const myData = useSelector((state) => state.attribute);
  const property = useSelector((state) => state.propertiesdata);
  console.log("Savebuttomnfile", property);
  const page = useSelector((state) => state.savepage);
  console.log("page", page);

  const mergedArray = myData.map(item => {
    const { id, ...propertyData } = property.find(prop => prop.id === item.id) || {};
    return {
      id: item.id,
      type: item.type,
      properties: propertyData || {}
    };
  });

  const formContent = async () => {
    try {
      const JsonElements = JSON.stringify(mergedArray);
      console.log("json data",JsonElements);
      const existingPage = page.find(p => p.id === id);
      if (existingPage) {
        dispatch(updatepage({ id, JsonElements }));
        toast({
          title: "Success",
          description: "Your page has been updated",
        });
      } else {
        dispatch(addpage({ id, JsonElements }));
        toast({
          title: "Success",
          description: "New page has been added",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Button variant={"outline"} className="gap-2" disabled={loading} onClick={() => {
      startTransition(formContent);
    }}>
      <HiSaveAs className="h-4 w-4 mr-1" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  )
}

export default SaveFormBtn;