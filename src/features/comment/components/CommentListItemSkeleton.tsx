import { Skeleton } from "@/components/ui/skeleton";

export default function CommentListItemSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="flex-1 h-16 rounded-xl" />

      <Skeleton className="size-8 rounded-lg" />
    </div>
  );
}
