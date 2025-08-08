// hooks/useCurrentUser.js
import useSWR from "swr";
import { fetcher } from "./useFetch";
import { getToken } from "../utils/auth";

export const useCurrentUser = () => {
  // Only fetch if we have a token
  const token = getToken()
  const { data, error, isLoading, mutate } = useSWR(
    token ? `${import.meta.env.VITE_BACKEND_URL}/auth/profile` : null,
    fetcher
  );
  
  return {
    user: data,
    isLoading,
    error,
    refetchUser: mutate,
  };
};