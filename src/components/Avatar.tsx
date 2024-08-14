import React, {useCallback} from 'react';
import useUser from "@/hooks/useUser";
import {useRouter} from "next/router";

interface avatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}
const Avatar : React.FC<avatarProps> = ({ userId, isLarge, hasBorder }) => {
    const { data } = useUser(userId);
    const router = useRouter();
    const onClick = useCallback((e: any)=>{
        e.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    },[router, userId])
    return (
        <div className={`
            cursor-pointer
            rounded-full
            relative
            ${isLarge ? `w-32` : `w-12`}
            ${isLarge ? `h-32` : `h-12`}
            ${hasBorder ? `border-4 border-black` : ``}
        `}>
            
        </div>
    );
};

export default Avatar;
