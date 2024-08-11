import React from 'react';
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "@/components/Avatar";

const UserCover: React.FC<{
    userId: string;
}> = ({ userId }) => {
    const { data } = useUser(userId);
    return (
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {data?.coverImage && (
                    <Image src={data.coverImage} fill style={{ objectFit: 'cover' }} alt="Cover Image"/>
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder/>
                </div>
            </div>
        </div>
    );
};

export default UserCover;