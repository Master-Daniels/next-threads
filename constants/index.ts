export const sidebarLinks = [
    {
        imgURL: "/assets/img/home.svg",
        route: "/",
        label: "Home",
    },
    {
        imgURL: "/assets/img/search.svg",
        route: "/search",
        label: "Search",
    },
    {
        imgURL: "/assets/img/heart.svg",
        route: "/activity",
        label: "Activity",
    },
    {
        imgURL: "/assets/img/create.svg",
        route: "/create-thread",
        label: "Create Thread",
    },
    {
        imgURL: "/assets/img/community.svg",
        route: "/communities",
        label: "Communities",
    },
    {
        imgURL: "/assets/img/user.svg",
        route: "/profile",
        label: "Profile",
    },
];

export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
