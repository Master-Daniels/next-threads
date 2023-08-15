"use server";

import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

import User from "../models/User.model";
import Thread from "../models/Thread.model";
import Community from "../models/Community.model";

import { FilterQuery, SortOrder } from "mongoose";

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
                onboarded: true,
            },
            { upsert: true }
        );
        if (path === "/profile/edit") revalidatePath(path);
    } catch (error: any) {
        throw new Error("Failed to update the user", error);
    }
}

export async function fetchUser(userId: string) {
    try {
        await connectToDB();

        return await User.findOne({ id: userId }).populate({
            path: "communities",
            model: Community,
        });
    } catch (error: any) {
        console.error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserPosts({ userId }: { userId: string }) {
    try {
        await connectToDB();

        const threads = await User.findOne({
            id: userId,
        }).populate({
            path: "threads",
            model: Thread,
            populate: [
                {
                    path: "community",
                    model: Community,
                    select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
                },
                {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: "author",
                        model: User,
                        select: "name image id",
                    },
                },
            ],
        });
        return threads;
    } catch (error: any) {
        throw new Error("Fetch User Posts Fail", error.message);
    }
}

interface FetchUsersParams {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    order?: SortOrder;
}
export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    order = "desc",
}: FetchUsersParams) {
    try {
        await connectToDB();
        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString, "i");
        const query: FilterQuery<typeof User> = {
            id: {
                $ne: userId,
            },
        };
        if (searchString.trim() !== "") {
            query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
        }

        const sortOptions = {
            createdAt: order,
        };

        const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

        const totalUserCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUserCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error: any) {
        throw new Error("Failed to fetch users", error.message);
    }
}

export async function getUserActivity(userId: string) {
    try {
        await connectToDB();

        const userThreads = await User.find({ author: userId });

        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, []);
        const replies = Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId },
        }).populate({
            path: "author",
            model: User,
            select: "name image _id",
        });

        return replies;
    } catch (error: any) {
        throw new Error("Failed to fetch user activities", error.message);
    }
}
