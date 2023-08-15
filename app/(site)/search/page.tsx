import UserCard from "@/components/cards/UserCard";
import SearchInput from "@/components/forms/SearchInput";
import Pagination from "@/components/shared/Pagination";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const results = await fetchUsers({
        userId: user.id,
        searchString: searchParams?.query || "",
        pageNumber: (searchParams?.page && +searchParams?.page) || 1,
        pageSize: (searchParams?.size && +searchParams?.size) || 20,
    });

    return (
        <section>
            <h1 className="head-text">Search</h1>
            <div className="mt-4">
                <SearchInput route="search" placeholder="Search Users..." />
            </div>
            <div className="mt-14 flex flex-col gap-9">
                {results.users.length < 1 ? (
                    <p className="no-results">No users Found</p>
                ) : (
                    <>
                        {results.users.map((user) => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                image={user.image}
                                name={user.name}
                                username={user.username}
                                personType="User"
                            />
                        ))}
                    </>
                )}
            </div>
            <Pagination
                path="search"
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={results.isNext}
            />
        </section>
    );
};

export default Page;
