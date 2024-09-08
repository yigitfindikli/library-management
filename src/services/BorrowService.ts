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
): Promise<{ success: boolean; message: string }> => {
    try {
        const user = await userRepository.findOneBy({ id: userId });
        const book = await bookRepository.findOneBy({ id: bookId });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (!book) {
            return { success: false, message: "Book not found" };
        }

        const existingBorrow = await borrowedBookRepository.findOne({
            where: { book: { id: bookId }, isReturned: false },
        });

        if (existingBorrow) {
            return { success: false, message: "Book is already borrowed" };
        }

        const borrowedBook = borrowedBookRepository.create({
            user,
            book,
            isReturned: false,
        });
        await borrowedBookRepository.save(borrowedBook);
        return { success: true, message: "Book successfully borrowed" };
    } catch (error) {
        console.error("Database error borrowing book:", error);
        return {
            success: false,
            message: "Could not borrow book due to a database error",
        };
    }
};

export const returnBook = async (
    userId: number,
    bookId: number,
    score: number
): Promise<{ success: boolean; message: string }> => {
    try {
        const borrowedBook = await borrowedBookRepository.findOne({
            where: {
                user: { id: userId },
                book: { id: bookId },
                isReturned: false,
            },
            relations: ["user", "book"],
        });

        if (!borrowedBook)
            return {
                success: false,
                message: "Book not found or already returned",
            };

        borrowedBook.userScore = score;
        borrowedBook.isReturned = true;
        await borrowedBookRepository.save(borrowedBook);

        const book = borrowedBook.book;
        const allRatings = await borrowedBookRepository.find({
            where: { book: { id: bookId }, isReturned: true },
            select: ["userScore"],
        });

        const validRatings = allRatings.filter(
            (rating) => rating.userScore !== null
        );
        const totalScore = validRatings.reduce(
            (sum, rating) => sum + (rating.userScore || 0),
            0
        );
        const averageRating =
            validRatings.length > 0 ? totalScore / validRatings.length : 0;

        book.averageRating = Number(averageRating.toFixed(2));
        await bookRepository.save(book);

        return { success: true, message: "Book returned successfully" };
    } catch (error) {
        console.error("Database error returning book:", error);
        return {
            success: false,
            message: "Could not return book due to a database error",
        };
    }
};
