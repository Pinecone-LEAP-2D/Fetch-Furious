import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getManyProfiles = async (req: Request, res: Response) => {
    try {
        console.log(req.query.page);
        
        const page = parseInt(req.query.page as string) || 1;
        console.log(page);
        
        const limit = 10
        const skip = (page - 1) * limit;

        const totalResults = await prisma.profile.count();
        const results = await prisma.profile.findMany({
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(totalResults / limit);

        res.status(200).json({
            totalResults,
            results,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error sss" });
    }
};