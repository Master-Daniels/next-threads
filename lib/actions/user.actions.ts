"use server";

import { revalidatePath } from "next/cache";
import User from "../models/User.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    image: string;
    bio: string;
    path: string;
}

export async function updateUser({ userId, username, name, image, bio, path }: Params): Promise<void> {
    try {
        await connectToDB();
        await User.findOneAndUpdate(
            {
                id: userId,
            },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
            },
            { upsert: true }
        );
        if (path === "/profile/edit") revalidatePath(path);
    } catch (error: any) {
        throw new Error("Failed to update the user", error);
    }
}

export async function getUser({ userId }: { userId: string | undefined }): Promise<typeof User | void> {
    try {
        await connectToDB();
        const user: any = await User.findOne({ id: userId });
        revalidatePath("/");
        return user;
    } catch (err) {
        console.log("From Find User", err);
    }
}
