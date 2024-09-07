import { User } from "../models/User";
import { Book } from "../models/Book";
import { BorrowedBook } from "../models/BorrowedBook";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);
const bookRepository = AppDataSource.getRepository(Book);
const borrowedBookRepository = AppDataSource.getRepository(BorrowedBook);

export const borrowBook = async (
    userId: number,
    bookId: number
): Promise<boolean> => {
    try {
        const user = await userRepository.findOneBy({ id: userId });
        const book = await bookRepository.findOneBy({ id: bookId });

        if (!user || !book) return false;

        const borrowedBook = borrowedBookRepository.create({ user, book });
        await borrowedBookRepository.save(borrowedBook);
        return true;
    } catch (error) {
        console.error("Database error borrowing book:", error);
        throw new Error("Could not borrow book");
    }
};

export const returnBook = async (
    userId: number,
    bookId: number,
    score: number
): Promise<boolean> => {
    try {
        const borrowedBook = await borrowedBookRepository.findOne({
            where: { user: { id: userId }, book: { id: bookId } },
            relations: ["user", "book"],
        });

        if (!borrowedBook) return false;

        borrowedBook.userScore = score;
        await borrowedBookRepository.save(borrowedBook);
        return true;
    } catch (error) {
        console.error("Database error returning book:", error);
        throw new Error("Could not return book");
    }
};
