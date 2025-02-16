import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async(
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
            orderBy: {
                date: "desc",
            },

        });

        // MODIFYING THE RETURNED VALUE
        const expenseByCategorySummary = expenseByCategoryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString()
            })
        );
        res.json(expenseByCategorySummary)
        
    } catch (error) {
        res.status(500).json({message: "Error retreiving Expense by category"})
    }
}