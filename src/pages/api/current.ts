import { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/../libs/prismaDb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.email) {
            return res.status(400).json("not logged in");
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });
        if (!currentUser) {
            return res.status(400).json("not logged in");
        }
        return res.status(200).json(currentUser);
    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}