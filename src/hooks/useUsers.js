import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/users"

export const useUser=(page)=>{
    return useQuery({
        queryKey:["users",page],
        queryFn:()=>getUsers(page),
        keepPreviousData: true,

    });
}
