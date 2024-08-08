import React, { useCallback, useRef } from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import PageElements from './designer/PageElements';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from './ui/dialog';
import paperSvg from '../assests/paper.svg';
import SavedPageElement from './designer/SavedPageElement';
import { HiCursorClick } from 'react-icons/hi';

function SubmitPage() {
    const savedpage = useSelector((state) => state.page.savedPageData);    
    
    //Api data

    console.log("")
    console.log("pageContentID", savedpage.page_id);


    // Submit form

    const formValues = useRef({});

    const submitValues = useCallback((key, value) => {
        formValues.current[key] = value;
    }, []);

    const submitForm = () => {
        console.log("Form Values:", formValues.current);
        // Add your form submission logic here
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
                        <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">File Name : {
                            savedpage.page_file_name
                        }</p>
                        <div className='flex justify-between w-full '>
                            <p className="font-medium text-[12px] text-muted-foreground group-hover:text-primary">Last Updated by<br/> {
                                savedpage.last_updated_by
                            }</p>
                            <p className="font-medium text-[12px] text-muted-foreground group-hover:text-primary">Last Updation Date<br/>{
                                savedpage.last_update_date
                            }</p>
                        </div>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
                    <div className='px-4 py-3 border-b'>
                        <p className='text-lg font-bold text-muted-foreground'>
                            Page Name : {savedpage.page_name}
                        </p>
                    </div>

                    <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto' style={{ backgroundImage: `url(${paperSvg})` }}>
                        <div className='max-w-[620px] flex flex-col  gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>{
                            savedpage.pageAttributes.map((page) => {
                                return <SavedPageElement key={page.attribute_id} element={page}
                                    submitValues={submitValues}
                                />
                            })}
                        </div>
                    </div>

                    {/* Dialog Footer */}
                    <DialogFooter>
                        <Button
                            className="mt-8"
                            onClick={() => {
                                submitForm();
                            }}
                        >
                            <HiCursorClick className='mr-2' />
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>



            </Dialog>
        </div>
    )
}

export default SubmitPage