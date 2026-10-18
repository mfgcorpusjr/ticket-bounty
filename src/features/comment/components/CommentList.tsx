"use client";

import InfiniteScroll from "react-infinite-scroll-component";

import Placeholder from "@/components/Placeholder";
import Spinner from "@/components/Spinner";
import CommentListItem from "@/features/comment/components/CommentListItem";
import CommentListItemSkeleton from "@/features/comment/components/CommentListItemSkeleton";

import useComments from "@/features/comment/hooks/useComments";

type Props = {
  ticketId: string;
};

export default function CommentList({ ticketId }: Props) {
  const { isLoading, error, data, hasNextPage, fetchNextPage } =
    useComments(ticketId);

  if (error) return <Placeholder text={error.message} />;

  const dateLength =
    data?.pages.reduce((acc, item) => acc + item.comments.length, 0) ?? 0;

  return (
    <InfiniteScroll
      dataLength={dateLength}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<></>}
    >
      <div className="flex flex-col gap-4 m-0.5 ml-8">
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <CommentListItemSkeleton key={i} />
          ))}

        {data?.pages.map((page) =>
          page.comments.map((comment) => (
            <CommentListItem key={comment.id} comment={comment} />
          )),
        )}
      </div>
    </InfiniteScroll>
  );
}
