import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from "bcrypt";
import prisma from "@/../libs/prismaDb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        const {email, password, name, username} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data:{
                email,
                username,
                hashedPassword: hashedPassword,
                name
            }
        });
        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.status(405).end();
    }

}