import { QueryClient, useQueries, useQuery } from "@tanstack/react-query";
import { getAnime, getGenres, getStudios } from "./api";

export const queryClient = new QueryClient();

export function useAnime() {
  return useQuery({
    queryKey: ["anime"],
    queryFn: getAnime,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
}

export function useStudios() {
  return useQuery({
    queryKey: ["studios"],
    queryFn: getStudios,
  });
}
