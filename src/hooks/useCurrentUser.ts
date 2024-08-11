import useSWR from "swr";
import {fetcher} from "../../libs/fetcher";

const useCurrentUser = () => {
    const { data, isLoading, error, mutate } = useSWR("/api/current", fetcher);
    return {
        data,
        isLoading,
        error,
        mutate
    }
}
export default useCurrentUser;