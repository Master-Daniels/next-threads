import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface IProps {
    currentUserId: string;
    accountId: string;
    accountType: string;
}
const getResults = async ({ accountType, accountId }: { accountType: string; accountId: string }) => {
    let results: any;

    if (accountType === "Community") {
        results = await fetchCommunityPosts(accountId);
    } else {
        results = await fetchUserPosts({ userId: accountId });
    }
    return results;
};

function ThreadsTab({ currentUserId, accountId, accountType }: IProps) {
    let results: any;
    getResults({ accountType, accountId }).then((res) => {
        results = res;
    });

    if (!results) redirect("/");

    return (
        <section className="mt-9 flex flex-col gap-10">
            {results.threads.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread?.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"
                            ? {
                                  name: results.name,
                                  image: results.image,
                                  id: results.id,
                              }
                            : {
                                  name: thread.author.name,
                                  image: thread.author.image,
                                  id: thread.author.id,
                              }
                    }
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    );
}

export default ThreadsTab;
