"use client";

import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface IProps {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: IProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {

        await addCommentToThread({
            threadId,
            commentText: values.thread,
            userId: currentUserId,
            path: pathname,
        });
        form.reset();
    };

    return (
        <Form {...form}>
            <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="profile image"
                                    width={48}
                                    height={48}
                                    className="object-cover rounded-full"
                                />
                            </FormLabel>
                            <FormControl className="border-none flex-1 w-full">
                                <Input
                                    type="text"
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none bg-transparent"
                                    autoFocus
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="comment-form_btn" type="submit">
                    Comment
                </Button>
            </form>
        </Form>
    );
};

export default Comment;
