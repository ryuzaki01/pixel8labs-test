import useSWR, {SWRConfiguration} from "swr";

export default function useUser(username: string, options?: SWRConfiguration) {
  const { data, mutate, isValidating, isLoading } = useSWR(
    username ? `/api/user/${username}` : null,
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
