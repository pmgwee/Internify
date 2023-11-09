import prismadb from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getProjectFavoriteList() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }

        const favorites = await prismadb.project.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteProjectIds || [])]
                }
            },
            include: {
                category: true,
                user: true,
            }
        });

        return favorites;
    } catch(error: any) {
        throw new Error(error);
    }
}