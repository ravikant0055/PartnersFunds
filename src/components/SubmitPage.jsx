import React from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import PageElements from './designer/PageElements';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import paperSvg from '../assests/paper.svg';
import SavedPageElement from './designer/SavedPageElement';

function SubmitPage() {
    const savedpage = useSelector((state) => state.savepage);
    // const pageContent = JSON.parse(savedpage);
    console.log("pageContent", savedpage);
    console.log("pageContent stringify", JSON.stringify(savedpage));
    console.log("pageContentID", savedpage[0]?.id);

    // calling component on click

    return (


        <div>
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant={"outline"}
                        className="group border border-primary/20 w-[350px] h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 mt-4"
                    >
                        {/* <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" /> */}
                        <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">{
                            savedpage[0]?.id
                        }</p>
                    </Button>
                </DialogTrigger>

                <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
                    <div className='px-4 py-3 border-b'>
                        <p className='text-lg font-bold text-muted-foreground'>
                            Page Id : {savedpage[0]?.id}
                        </p>
                    </div>

                    <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto' style={{ backgroundImage: `url(${paperSvg})` }}>
                        <div className='max-w-[620px] flex flex-col  gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>{
                            savedpage[0]?.mergedArray.map((page) => {
                                return <SavedPageElement key={page.id} element={page} />
                            })}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SubmitPage