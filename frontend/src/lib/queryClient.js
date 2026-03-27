import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 2 minutes before refetching
      staleTime: 1000 * 60 * 2,
      // Keep unused data in cache for 5 minutes
      gcTime: 1000 * 60 * 5,
      // Retry failed requests once
      retry: 1,
      // Don't refetch when window regains focus (less intrusive)
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
