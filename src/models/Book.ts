import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BorrowedBook } from "./BorrowedBook";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("decimal", { precision: 3, scale: 2, default: 0.0 })
    averageRating!: number;

    @OneToMany(() => BorrowedBook, (borrowedBook) => borrowedBook.book)
    borrowedBooks!: BorrowedBook[];
}
