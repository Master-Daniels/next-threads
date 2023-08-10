import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { getUser } from "@/lib/actions/user.actions";

const OnboardingPage = async () => {
    const user = await currentUser();
    const userInfo: any = await getUser({ userId: user?.id });

    console.log("FromPage", userInfo);

    const userData = {
        id: user?.id!,
        objectId: userInfo._id.toString(),
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName + "  " + user?.lastName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    };
    return (
        <main className="max-w-3xl mx-auto flex flex-col justify-start p-10">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete your profile now to start using Threads&trade;
            </p>
            <section className="mt-9 bg-dark-2 p-10 rounded-md min-w-[40vw]">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    );
};

export default OnboardingPage;
