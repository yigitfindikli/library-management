import { Request, Response } from "express";
import { borrowBook, returnBook } from "../services/BorrowService";

export const BorrowBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const userId = Number(req.params.userId);
        const bookId = Number(req.params.bookId);
        const result = await borrowBook(userId, bookId);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json({ message: result.message });
    } catch (error: any) {
        console.error("Error borrowing book:", error.message);
        return res
            .status(500)
            .json({ message: "Error borrowing book", error: error.message });
    }
};

export const ReturnBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const userId = Number(req.params.userId);
        const bookId = Number(req.params.bookId);
        const { score } = req.body;

        const result = await returnBook(userId, bookId, score);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json({ message: result.message });
    } catch (error: any) {
        console.error("Error returning book:", error.message);
        return res
            .status(500)
            .json({ message: "Error returning book", error: error.message });
    }
};
