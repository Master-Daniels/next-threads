import { getUserActivity } from "@/lib/actions/user.actions";

import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const activity = await getUserActivity(userInfo?._id);

    return (
        <section>
            <h1 className="head-text">Activity</h1>

            <section className="mt-10 flex flex-col gap-5">
                {activity.length ? (
                    <>
                        {activity.map((activity: any) => (
                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className="activity-card">
                                    <Image
                                        src={activity.author.image}
                                        alt="profile picture"
                                        height={20}
                                        width={20}
                                        className="rounded-full object-contain"
                                    />
                                    <p className="text-small-regular text-light-1">
                                        <span className="mr-1 text-primary-500">{activity.author.name} </span>
                                        replied to your thread.
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className="text-base-regular text-light-3 text-center">No activity yet.</p>
                )}
            </section>
        </section>
    );
};

export default Page;
