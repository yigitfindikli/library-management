import { Book } from "../models/Book";
import { AppDataSource } from "../data-source";

const bookRepository = AppDataSource.getRepository(Book);

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        return await bookRepository.find();
    } catch (error) {
        console.error("Database error fetching books:", error);
        throw new Error("Could not fetch books");
    }
};

export const getBookById = async (id: number): Promise<Book | null> => {
    try {
        return await bookRepository.findOneBy({ id });
    } catch (error) {
        console.error("Database error fetching book:", error);
        throw new Error("Could not fetch book");
    }
};

export const createBook = async (bookData: Partial<Book>): Promise<Book> => {
    try {
        const book = bookRepository.create(bookData);
        return await bookRepository.save(book);
    } catch (error) {
        console.error("Database error creating book:", error);
        throw new Error("Could not create book");
    }
};

export const updateBook = async (
    id: number,
    bookData: Partial<Book>
): Promise<Book | null> => {
    try {
        const book = await getBookById(id);
        if (!book) return null;

        Object.assign(book, bookData);
        return await bookRepository.save(book);
    } catch (error) {
        console.error("Database error updating book:", error);
        throw new Error("Could not update book");
    }
};

export const deleteBook = async (id: number): Promise<boolean> => {
    try {
        const result = await bookRepository.delete(id);
        return result.affected !== 0;
    } catch (error) {
        console.error("Database error deleting book:", error);
        throw new Error("Could not delete book");
    }
};
