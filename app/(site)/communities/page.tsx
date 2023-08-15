import CommunityCard from "@/components/cards/CommunityCard";
import SearchInput from "@/components/forms/SearchInput";
import Pagination from "@/components/shared/Pagination";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const results = await fetchCommunities({
        searchString: searchParams?.query || "",
        pageNumber: (searchParams?.page && +searchParams?.page) || 1,
        pageSize: (searchParams?.size && +searchParams?.size) || 25,
    });

    return (
        <section>
            <h1 className="head-text">Communities</h1>
            <div className="mt-4">
                <SearchInput route="communities" placeholder="Search Communities..." />
            </div>
            <div className="mt-14 flex flex-col gap-9">
                {results.communities.length === 0 ? (
                    <p className="no-results text-light-4 text-center">No communities Found</p>
                ) : (
                    <>
                        {results.communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </div>
            <Pagination
                path="communities"
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={results.isNext}
            />
        </section>
    );
};

export default Page;
