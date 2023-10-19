import { useAuthState } from "./firebase";
import { useDbData } from "./crud";

export const useProfile = () => {
    const [user] = useAuthState();
    const [userRoleData, isLoading, error] = useDbData(`/users/${user?.uid || 'guest'}`);
    const isAdmin = userRoleData?.role === 'admin'; // Or however you structure roles
    return [{ user, isAdmin }, isLoading, error];
  };