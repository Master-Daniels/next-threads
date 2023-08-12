import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";

import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comment from "@/components/forms/Comment";

const Page = async ({ params }: { params: { threadId: string } }) => {
    if (!params.threadId) return null;

    const user = await currentUser();

    const userInfo = await fetchUser(user?.id as string);
    if (!userInfo.onboarded) redirect("/onboarded");

    const thread = await fetchThreadById(params.threadId);

    return (
        <section className="relative">
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread?.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
            />
            <div className="mt-7">
                <Comment
                    threadId={thread.id}
                    currentUserImg={user?.imageUrl || ""}
                    currentUserId={userInfo._id.toString()}
                />
            </div>
        </section>
    );
};

export default Page;
