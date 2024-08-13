import React, { useCallback, useRef } from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import PageElements from './designer/PageElements';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from './ui/dialog';
import paperSvg from '../assests/paper.svg';
import SavedPageElement from './designer/SavedPageElement';
import { HiCursorClick } from 'react-icons/hi';
import { DialogTitle } from '@radix-ui/react-dialog';

function SubmitPage() {
    const savedpage = useSelector((state) => state.page.savedPageData);

    //Api data

    console.log("savedpage",savedpage)
    console.log("pageContentID", savedpage.page_id);


    // Submit form

    const formValues = useRef({});
    console.log("23", formValues);


    const submitValues = useCallback((key, value) => {
        console.log("27", formValues);
        console.log("28", formValues.current);
        formValues.current[key] = value;
    }, []);

    const submitForm = () => {
        const formData = Object.keys(formValues.current).map(key => {
            return {
                attid: key,
                value: formValues.current[key]
            };
        });
        console.log("Form Data:", JSON.stringify(formData));
        console.log("Form Data:", formData);
    };



    return (


        <div >
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant={"outline"}
                        className=" group border border-primary/20 w-[350px] h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 mt-4  p-0"
                    >
                        {/* <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" /> */}
                        <div className='flex flex-col w-full h-full justify-between py-4 px-2'>
                            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Page Name : {
                                savedpage.page_name
                            }</p>
                            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Page Title : {
                                savedpage.page_title
                            }</p>
                            <div className='flex justify-between w-full '>
                                <p className="font-medium text-[12px] text-muted-foreground group-hover:text-primary">Last Updated by<br /> {
                                    savedpage.last_updated_by
                                }</p>
                                <p className="font-medium text-[12px] text-muted-foreground group-hover:text-primary">Last Updation Date<br />{
                                    savedpage.last_update_date
                                }</p>
                            </div>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
                    <DialogHeader>
                        <DialogTitle className='flex items-center py-1.5 px-6 justify-between'>
                            <p>Page Name : {savedpage.page_name}</p>
                            <Button
                                className='mr-9'
                                onClick={() => {
                                    submitForm();
                                }}
                            >
                                <HiCursorClick className="mr-2" />
                                Submit
                            </Button>
                        </DialogTitle>   
                    </DialogHeader>

                    <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto' style={{ backgroundImage: `url(${paperSvg})` }}>
                        <div className='max-w-[620px] flex flex-col  gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>{
                            savedpage.pageAttributes.map((page) => {
                                return <SavedPageElement key={page.attribute_id} element={page}
                                    submitValues={submitValues}
                                />
                            })}
                        </div>
                    </div>

                </DialogContent>



            </Dialog>
        </div>
    )
}

export default SubmitPage