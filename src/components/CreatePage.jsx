import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePage = () => {
    const form = useForm();
    const navigate = useNavigate();

    async function onSubmit(values) {
        console.log("form submit", values);
        try {

            // Step 1: POST request to create the form

            const currentDate = new Date().toISOString().split('T')[0];
            const { page_name, page_title } = values;
            const postResponse = await axios.post('http://localhost:8080/page/addPage', {
                page_name: page_name,
                page_file_name: page_name + ".html",
                page_title: page_title,
                parent_page_id: null,
                created_by: "admin",
                creation_date: currentDate,
                last_updated_by: "admin",
                last_update_date: currentDate,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const pageId=3;
            console.log("mera output",postResponse.data);

            // if (!postResponse.ok) {
            //     throw new Error('Failed to create Page');
            // }

            // const postData = await postResponse.json();

            // const pageId = postData.pageId;
            // console.log('Page created successfully. Page ID:', pageId);



            // Step 2: GET request to fetch form details using pageId
            // const getResponse = await fetch(`http://localhost:8080/api/getPageById/${pageId}`);
            // if (!getResponse.ok) {
            //     throw new Error('Failed to fetch form details');
            // }

            // const getData = await getResponse.json();
            // // Assuming getData contains name and description of the created form

            // const {id, name, description } = getData;
            // console.log('Form details fetched successfully:',id, name, description);

            toast({
                title: "Success",
                description: "Page created successfully",
            });

            navigate(`/page/${pageId}`)

        } catch (error) {
            console.error('Error creating form:', error);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="group border border-primary/20 w-[350px] h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
                >
                    <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                    <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create new page</p>
                </Button>
            </DialogTrigger>


            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Create Page</DialogTitle>
                    <DialogDescription>Create a new page to start collecting responses</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-2">

                        <FormField
                            control={form.control}
                            name="page_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="page_title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Page Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </form>
                </Form>

                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
                        {!form.formState.isSubmitting ? <span>Save</span> : <ImSpinner2 className="animate-spin" />}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default CreatePage
