import useSWR, {SWRConfiguration} from "swr";

export default function useRepositories(options?: SWRConfiguration) {
  const { data, mutate, isValidating, isLoading } = useSWR(
    `/api/repositories`,
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
