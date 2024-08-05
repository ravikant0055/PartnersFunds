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
    // const savedpage = useSelector((state) => state.savepage);                       //Api data
    const savedpage = {
    "page_id": 1512,
    "page_name": "Pradjs",
    "page_file_name": "Pradjs.html",
    "page_title": "jsvbhuoi",
    "parent_page_id": null,
    "created_by": "admin",
    "creation_date": "2024-08-05",
    "last_updated_by": "admin",
    "last_update_date": "2024-08-05",
    "pageAttributes": [
        {
            "attribute_id": 1822,
            "page_id": 1512,
            "attribute_name": "heading",
            "attribute_type": "heading",
            "created_by": null,
            "creation_date": null,
            "last_updated_by": null,
            "last_update_date": null,
            "pageAttrPropertiesEntity": [
                {
                    "property_id": 2874,
                    "attribute_id": 2335,
                    "property_name": "label",
                    "property_tag": "label",
                    "property_value": "Heading",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2875,
                    "attribute_id": 2335,
                    "property_name": "fontsize",
                    "property_tag": "fontsize",
                    "property_value": "26",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2876,
                    "attribute_id": 2335,
                    "property_name": "fontweight",
                    "property_tag": "fontweight",
                    "property_value": "800",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2877,
                    "attribute_id": 2335,
                    "property_name": "fontcolor",
                    "property_tag": "fontcolor",
                    "property_value": "",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                }
            ]
        },
        {
            "attribute_id": 1823,
            "page_id": 1512,
            "attribute_name": "textarea",
            "attribute_type": "textarea",
            "created_by": null,
            "creation_date": null,
            "last_updated_by": null,
            "last_update_date": null,
            "pageAttrPropertiesEntity": [
                {
                    "property_id": 2878,
                    "attribute_id": 65654,
                    "property_name": "label",
                    "property_tag": "label",
                    "property_value": "Text--------- Area",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2879,
                    "attribute_id": 65654,
                    "property_name": "require",
                    "property_tag": "require",
                    "property_value": "true",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2880,
                    "attribute_id": 65654,
                    "property_name": "placeholder",
                    "property_tag": "placeholder",
                    "property_value": "value here...",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2881,
                    "attribute_id": 65654,
                    "property_name": "rows",
                    "property_tag": "rows",
                    "property_value": "3",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2882,
                    "attribute_id": 65654,
                    "property_name": "color",
                    "property_tag": "color",
                    "property_value": "",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2883,
                    "attribute_id": 65654,
                    "property_name": "fontsize",
                    "property_tag": "fontsize",
                    "property_value": "16px",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2884,
                    "attribute_id": 65654,
                    "property_name": "fontcolor",
                    "property_tag": "fontcolor",
                    "property_value": "",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2885,
                    "attribute_id": 65654,
                    "property_name": "height",
                    "property_tag": "height",
                    "property_value": "50px",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                },
                {
                    "property_id": 2886,
                    "attribute_id": 65654,
                    "property_name": "width",
                    "property_tag": "width",
                    "property_value": "200px",
                    "property_type": "VISUAL",
                    "created_by": null,
                    "creation_date": null,
                    "last_updated_by": null,
                    "last_update_date": null,
                    "pageAttributesEntity": null
                }
            ]
        }
    ]
}
    // const pageContent = JSON.parse(savedpage);
    // console.log("pageContent", savedpage);
    // console.log("pageContent stringify", JSON.stringify(savedpage));
    // console.log("pageContentID", savedpage[0]?.id);

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


        <div>
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant={"outline"}
                        className="group border border-primary/20 w-[350px] h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 mt-4"
                    >
                        {/* <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" /> */}
                        <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">{
                            savedpage.page_name
                        }</p>
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