import React from 'react';
import {useRouter} from "next/router";
import useUser from "@/hooks/useUser";
import {ClipLoader} from "react-spinners";
import Header from "@/components/Header";
import UserCover from "@/components/users/UserCover";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";


const UserPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data, isLoading } = useUser(userId as  string);
    if (isLoading || !data) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader size={70} color="lightblue"/>
            </div>
        )
    }
    return (
        <>
            <Header label={data?.name} showBackArrow/>
            <UserCover userId={userId as string} />
            <UserBio userId={userId as string}/>
            <PostFeed userId={userId as string}/>
        </>
    );
};

export default UserPage;