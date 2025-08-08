// hooks/useFetch.js
import useSWR from 'swr';
import axios from 'axios';

export const fetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const useFetch = (url) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, refetch: mutate };
};
