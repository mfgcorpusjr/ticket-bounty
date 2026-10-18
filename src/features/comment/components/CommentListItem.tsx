import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DeleteCommentButton from "@/features/comment/components/DeleteCommentButton";

import type { Comment } from "@/generated/prisma/client";
import { formatDate } from "@/utils/date";

type Props = {
  comment: Comment & { user: { email: string }; isOwner: boolean };
};

export default function CommentListItem({ comment }: Props) {
  return (
    <div className="flex gap-2">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex justify-between gap-4 text-xs text-muted-foreground">
            <span>{comment.isOwner ? "You" : comment.user.email}</span>

            <span>{formatDate(comment.createdAt)}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p>{comment.text}</p>
        </CardContent>
      </Card>

      {comment.isOwner && <DeleteCommentButton id={comment.id} />}
    </div>
  );
}
