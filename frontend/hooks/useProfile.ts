import useSWR, {SWRConfiguration} from "swr";

export default function useProfile(options?: SWRConfiguration) {
  const { data, mutate, isValidating, isLoading } = useSWR(
    `/api/profile`,
    (url: string) => {
      return fetch(url).then((response) => response.json())
    },
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      ...options
    }
  )

  return {
    data,
    mutate,
    isValidating,
    isLoading
  };
}
