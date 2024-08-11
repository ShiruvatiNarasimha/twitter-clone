import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/../libs/prismaDb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    try {
        const {postId} = req.query;
        if (!postId || typeof postId !== "string") {
            throw new Error('Invalid ID');
        }
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
            }
        });
        // console.log(post);
        if (!post) {
            return res.status(405).send("Wrong postID");
        } else {
            return res.status(200).json(post);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(405).end();
    }
}