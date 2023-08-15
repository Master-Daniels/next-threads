"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IProps {
    id: string;
    name: string;
    username: string;
    image: string;
    personType: string;
}

const UserCard = ({ id, name, username, image, personType }: IProps) => {
    const router = useRouter();
    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <Link href={`/profile/${id}`}>
                    <Image src={image} width={48} height={48} alt="logo" className="rounded-full" />
                </Link>
                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-light-1">{name}</h4>
                    <p className="text-small-medium text-gray-1">{username}</p>
                </div>
            </div>
            <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>
                View
            </Button>
        </article>
    );
};

export default UserCard;
