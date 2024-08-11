import {NextApiRequest, NextApiResponse} from "next";
import serverAuth from "../../../libs/serverAuth";
import prisma from "@/../libs/prismaDb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST" && req.method !== "DELETE") {
        return res.status(405).end();
    }
    try {
        const {currentUser} = await serverAuth(req, res);
        const {userId} = req.body;
        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid userID");
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            throw new Error("Invalid userID");
        }
        let updatedFollowingIds = [...(user.followingIds || [])];

        if (req.method === "POST") {
            updatedFollowingIds.push(userId);
            //notif part
            try {
                await prisma.notification.create({
                    data: {
                        body: "Someone commented on your tweet!",
                        userId
                    }
                });
                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        hasNotification: true
                    }
                });
            } catch (e) {
                console.log(e);
            }
            //end
        }
        if (req.method === "DELETE") {
            updatedFollowingIds = updatedFollowingIds.filter(id => id !== userId);
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });
        return res.status(200).json(updatedUser);
    } catch (e) {
        console.log(e);
        return res.status(405).end();
    }
}