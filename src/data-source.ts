import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Book } from "./models/Book";
import { BorrowedBook } from "./models/BorrowedBook";
import ormConfig from "../ormconfig.json";

export const AppDataSource = new DataSource({
    ...ormConfig,
    entities: [User, Book, BorrowedBook],
    type: "postgres",
});
