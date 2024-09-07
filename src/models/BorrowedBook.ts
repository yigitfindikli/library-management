import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class BorrowedBook {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.borrowedBooks)
    user!: User;

    @ManyToOne(() => Book, (book) => book.borrowedBooks)
    book!: Book;

    @Column("boolean", { default: false })
    isReturned!: boolean;

    @Column("int", { nullable: true })
    userScore!: number;
}
