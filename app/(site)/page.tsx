import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
    const results = await fetchThreads();

    const user = await currentUser();

    return (
        <>
            <h1 className="text-5xl font-black text-white">Threads</h1>
            <section className="mt-9 flex flex-col gap-10">
                {results.threads.length === 0 ? (
                    <p className="no-result">No threads found</p>
                ) : (
                    <>
                        {results.threads.map((post) => (
                            <ThreadCard
                                key={post._id}
                                id={post._id}
                                currentUserId={user?.id!}
                                parentId={post.parentId}
                                content={post.text}
                                author={post.author}
                                community={post.community}
                                createdAt={post.createdAt}
                                comments={post.children}
                            />
                        ))}
                    </>
                )}
            </section>
        </>
    );
}
