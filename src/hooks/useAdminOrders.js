import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orderService";

const useAdminOrders = ()=>{
    return useQuery({
        queryKey:["admin","orders"],
        queryFn:getOrders,
    })
}

export default useAdminOrders;