import useSWR, {SWRConfiguration} from "swr";

export default function useRepositories(username: string, options?: SWRConfiguration) {
  const { data, mutate, isValidating, isLoading } = useSWR(
    username ? `/api/repositories/${username}` : null,
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
    data: data as Repository[],
    mutate,
    isValidating,
    isLoading
  };
}
