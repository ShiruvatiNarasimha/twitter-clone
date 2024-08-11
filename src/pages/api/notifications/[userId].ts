import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/../libs/prismaDb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "GET") {
        return res.status(405).end();
    }
    try {
        const { userId } = req.query;
        if (!userId || typeof userId !== "string") {
            throw new Error("invalid ID");
        }
        const notifications = await prisma.notification.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false
            }
        });
        return res.status(200).json(notifications);
    } catch (e) {
        console.log(e);
        return res.status(405).end();
    }
}