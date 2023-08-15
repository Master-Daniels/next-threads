import CommunityCard from "../cards/CommunityCard";
import UserCard from "../cards/UserCard";

interface IProps {
    communities: any;
    users: any;
}

const RightSidebar: React.FC<IProps> = ({ communities, users }) => {

    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-light-1">Suggested Communities</h3>
                <div className="mt-7 flex flex-col gap-9">
                    {communities.map((community: any) => (
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
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-light-1">Suggested Users</h3>
                <div className="mt-7 flex flex-col gap-9">
                    {users.map((user: any) => (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            image={user.image}
                            name={user.name}
                            username={user.username}
                            personType="User"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RightSidebar;
