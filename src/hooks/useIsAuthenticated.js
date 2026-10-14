import { getUserId } from "../utils/localStorage";

const useIsAuthenticated = ()=> {
    return Boolean(getUserId())
}

export default useIsAuthenticated;