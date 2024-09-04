import { prisma } from "@/src/prisma";
import RouteError from "../error";
import { requiredCurrentUser } from "@/src/features/auth/action/current-user";
import { PageParams } from "@/src/types/next";
import { ActionError } from "@/src/features/git/class/ActionError";

export default async function RouteParams(props: PageParams<{ id: string }>) {

    try {
        const id = props.params.id
        const current = await requiredCurrentUser()

        if (!current) {
            throw new ActionError("You must be logged.")
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                
            }
        })
        return (
            <div>
                {user?.name}
            </div>
        )
    }
    catch (error) {
        return <RouteError />;
    }
}
