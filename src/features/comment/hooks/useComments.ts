import { useInfiniteQuery } from "@tanstack/react-query";

import { getComments } from "@/features/comment/utils/queries";

const useComments = (ticketId: string) => {
  return useInfiniteQuery({
    queryKey: ["tickets", ticketId, "comments"],
    queryFn: async ({ pageParam }) => {
      const data = await getComments(ticketId, pageParam);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.metadata.hasNextPage ? allPages.length + 1 : undefined;
    },
  });
};

export default useComments;
