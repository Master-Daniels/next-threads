"use server";

import { connectToDB } from "../mongoose";
import Thread from "../models/Thread.model";
import User from "../models/User.model";
import { revalidatePath } from "next/cache";

interface CreateParams {
    text: string;
    author: string;
    communityId?: string;
    path: string;
}

export async function createThread({ text, author, communityId, path }: CreateParams) {
    try {
        await connectToDB();
        const thread = await Thread.create({
            text,
            author,
            community: communityId,
        });

        await User.findByIdAndUpdate(author, {
            $push: {
                threads: thread._id,
            },
        });
        revalidatePath(path);
    } catch (error: any) {
        console.error("Could not create thread", error.message);
    }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    await connectToDB();

    const skipSize = (pageNumber - 1) * pageSize;

    // fetch threads that have no parents, ie thy are original posts.
    const threadsQuery = Thread.find({
        parentId: { $in: [null, undefined] },
    })
        .sort({ createdAt: "descending" })
        .skip(skipSize)
        .limit(pageSize)
        .populate({
            path: "author",
            model: User,
        })
        .populate({
            path: "children",
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image",
            },
        });

    const totalThreadsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
    });

    const threads = await threadsQuery.exec();

    const isNext = totalThreadsCount > skipSize + threads.length;

    return { threads, isNext };
}

export async function fetchThreadById(threadId: string) {
    await connectToDB();

    try {
        const thread = await Thread.findById(threadId)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            })
            .populate({
                path: "community",
                // model: Community,
                select: "_id id name image",
            })
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image",
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image",
                        },
                    },
                ],
            })
            .exec();

        return thread;
    } catch (err) {
        console.error("Error while fetching thread:", err);
        throw new Error("Unable to fetch thread");
    }
}

interface AddCommentParams {
    threadId: string;
    commentText: string;
    userId: string;
    path: string;
}
export async function addCommentToThread({ threadId, commentText, userId, path }: AddCommentParams) {
    await connectToDB();

    try {
        // Find the original thread by its ID
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error("Thread not found");
        }

        // Create the new comment thread
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId, // Set the parentId to the original thread's ID
        });

        // Save the comment thread to the database
        const savedCommentThread = await commentThread.save();

        // Add the comment thread's ID to the original thread's children array
        originalThread.children.push(savedCommentThread._id);

        // Save the updated original thread to the database
        await originalThread.save();

        revalidatePath(path);
    } catch (err) {
        console.error("Error while adding comment:", err);
        throw new Error("Unable to add comment");
    }
}
