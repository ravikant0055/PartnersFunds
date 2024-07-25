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
import { useDispatch, useSelector } from "react-redux";
import { createPage, fetchPageById } from "../store/PageDataSlice";

const CreatePage = () => {
    const form = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const onSubmit = async (values) => {

        try {
            const createdPage = await dispatch(createPage(values));
            const pageId = createdPage.payload;

            if (createdPage) {
                const getPage = await dispatch(fetchPageById(pageId));
                const getPageData = getPage.payload;
                console.log("Fetched page data:", getPageData);
                navigate(`/page/${pageId}`);
            }

        } catch (error) {
            console.error('Error:', error);
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
