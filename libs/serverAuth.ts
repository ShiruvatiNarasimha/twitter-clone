import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/../libs/prismaDb";

async function serverAuth(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
        throw new Error("not Signed in");
    }
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
    });
    if (!currentUser) {
        throw new Error("some error occurred");
    }
    return { currentUser };
}
export default serverAuth;