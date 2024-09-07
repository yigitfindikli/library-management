import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook,
} from "../services/BookService";
import { Request, Response } from "express";

export const GetAllBooks = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const books = await getAllBooks();
        return res.json(books);
    } catch (error: any) {
        console.error("Error fetching books:", error.message);
        return res
            .status(500)
            .json({ message: "Error fetching books", error: error.message });
    }
};

export const GetBookById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const bookId = Number(req.params.id);
        const book = await getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json(book);
    } catch (error: any) {
        console.error("Error fetching book:", error.message);
        return res
            .status(500)
            .json({ message: "Error fetching book", error: error.message });
    }
};

export const CreateBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const book = await createBook(req.body);
        return res.status(201).json(book);
    } catch (error: any) {
        console.error("Error creating book:", error.message);
        return res
            .status(500)
            .json({ message: "Error creating book", error: error.message });
    }
};

export const UpdateBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const bookId = Number(req.params.id);
        const book = await updateBook(bookId, req.body);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json(book);
    } catch (error: any) {
        console.error("Error updating book:", error.message);
        return res
            .status(500)
            .json({ message: "Error updating book", error: error.message });
    }
};

export const DeleteBook = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const bookId = Number(req.params.id);
        const result = await deleteBook(bookId);
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(204).send();
    } catch (error: any) {
        console.error("Error deleting book:", error.message);
        return res
            .status(500)
            .json({ message: "Error deleting book", error: error.message });
    }
};
