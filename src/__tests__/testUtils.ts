import { AppDataSource } from "../data-source";
import { BorrowedBook } from "../models/BorrowedBook";
import { User } from "../models/User";
import { Book } from "../models/Book";

export async function cleanupTestData() {
    const borrowedBookRepository = AppDataSource.getRepository(BorrowedBook);
    const userRepository = AppDataSource.getRepository(User);
    const bookRepository = AppDataSource.getRepository(Book);

    await borrowedBookRepository.delete({});
    await userRepository.delete({});
    await bookRepository.delete({});
}
