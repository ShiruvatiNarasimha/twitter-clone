import React from 'react';
import CommentItem from "@/components/posts/CommentItem";

interface commentFeedProps {
    comments?: Record<string, any>[];
}
const CommentFeed: React.FC<commentFeedProps> = ({ comments = [] }) => {
    return (
        <>
            {comments.map((comment) => (
                <CommentItem key={comment.id} data={comment}/>
            ))}
        </>
    );
};

export default CommentFeed;