import usePost from "@/hooks/usePost";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import {useSetRecoilState} from "recoil";
import {loginModalAtom} from "@/store/modalAtoms";
import {useCallback, useMemo} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: {postId: string, userId?:string}) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { data: fetchedPosts, mutate: mutateFetchedPosts } = usePosts(userId);
    const setIsLoginModalOpen = useSetRecoilState(loginModalAtom);

    const hasLiked = useMemo(()=>{
        const list = fetchedPost?.likedIds || [];
        return list.includes(currentUser?.id);
    }, [fetchedPost, currentUser]);

    const toggleLike = useCallback(async ()=>{
        if (!currentUser) {
            setIsLoginModalOpen({isOpen: true});
        }
        try {
            let request;
            if (hasLiked) {
                request = () => axios.delete("/api/like", { data: { postId } });
            } else {
                request = () => axios.post("/api/like", { postId });
            }
            await request();
            mutateFetchedPosts();
            mutateFetchedPost();
            toast.success("Success");
        } catch (e) {
            console.log(e);
            toast.error("Unexpected Error Occurred");
        }
    }, [currentUser, hasLiked, mutateFetchedPost, mutateFetchedPosts, postId, setIsLoginModalOpen]);
    return {
        hasLiked,
        toggleLike
    }
}
export default useLike;