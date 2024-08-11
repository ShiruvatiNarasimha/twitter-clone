import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import {useSetRecoilState} from "recoil";
import {loginModalAtom} from "@/store/modalAtoms";
import {useCallback, useMemo} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);
    const setIsLoginModalOpen = useSetRecoilState(loginModalAtom);

    const isFollowing = useMemo(() => {
        const followingIds = currentUser?.followingIds || [];
        return followingIds.includes(userId);
    },[currentUser?.followingIds, userId]);

    const toggleFollow = useCallback(async ()=>{
        if (!currentUser) {
            setIsLoginModalOpen({isOpen: true});
        }
        try {
            let request;
            if (!isFollowing) {
                request = () => axios.post("/api/follow", { userId });
            } else {
                request = () => axios.delete("/api/follow", { data: {userId} });
            }
            await request();
            mutateCurrentUser();
            mutateFetchedUser();
            toast.success("Success");
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong");
        }
    }, [currentUser, isFollowing, mutateCurrentUser, mutateFetchedUser, setIsLoginModalOpen, userId]);
    return {
        isFollowing,
        toggleFollow
    }
}
export default useFollow;