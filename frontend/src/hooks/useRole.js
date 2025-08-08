// src/hooks/useRole.js
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  return user?.role || "guest"; // default to guest
};

export default useRole;
