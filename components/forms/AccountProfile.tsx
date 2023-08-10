"use client";

import { CldUploadButton } from "next-cloudinary";

import * as zod from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

type IProps = {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
};

const AccountProfile = ({ user, btnTitle }: IProps) => {
    const [loading, setLoading] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const form = useForm<zod.infer<typeof UserValidation>>({
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            bio: user?.bio || "",
            username: user?.username || "",
        },
        resolver: zodResolver(UserValidation),
    });

    async function onSubmit(values: zod.infer<typeof UserValidation>) {
        setLoading(true);
        try {
            await updateUser({
                ...values,
                userId: user.id,
                path: pathname,
                image: values.profile_photo,
            });
            setLoading(false);
            if (pathname === "/profile/edit") {
                router.back();
            } else {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-y-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => {
                        return (
                            <FormItem className="flex items-center justify-center gap-4">
                                <FormLabel className="account-form_image-label cursor-pointer">
                                    <Image
                                        src={field.value || "/assets/img/logo.svg"}
                                        alt="profile photo"
                                        width={94}
                                        height={94}
                                        priority
                                        className="rounded-full object-contain"
                                    />
                                </FormLabel>
                                <FormControl>
                                    <CldUploadButton
                                        onUpload={(result: any) => field.onChange(result.info.secure_url)}
                                        options={{
                                            maxFiles: 1,
                                        }}
                                        uploadPreset="printjyq"
                                        className="hidden"
                                    />
                                </FormControl>
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 w-full">
                            <FormLabel className="text-base-semibold text-light-2">Name</FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="text"
                                    placeholder="name"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 w-full">
                            <FormLabel className="text-base-semibold text-light-2">Username</FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="text"
                                    placeholder="username"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2 w-full">
                            <FormLabel className="text-base-semibold text-light-2">Bio</FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Textarea rows={6} className="account-form_input no-focus" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className="hover:bg-primary-500 bg-primary-500/50 w-fit mx-auto hover:scale-110 transition duration-1000"
                >
                    {loading ? "Loading..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default AccountProfile;
