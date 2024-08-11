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
        const { userId } = req.query;
        if (!userId || typeof userId !== "string") {
            return res.status(405).json("Invalid UserId");
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        const followersCount = await prisma.user.count({
            where: {
                followingIds:  {
                    has: userId
                }
            }
        });
        return res.status(200).json({...user, followersCount});
    } catch (e) {
        console.log(e);
        return res.status(405).end();
    }
}