import request from "supertest";
import { Application } from "express";
import { AppDataSource } from "../data-source";
import app from "../app";
import { cleanupTestData } from "./testUtils";

let server: Application;
let userId: number;
let bookId: number;

beforeAll(async () => {
    await AppDataSource.initialize();
    server = app;

    const userResponse = await request(server)
        .post("/users")
        .send({ name: "Test User" });
    userId = userResponse.body.id;

    const bookResponse = await request(server)
        .post("/books")
        .send({ name: "Test Book" });
    bookId = bookResponse.body.id;
});

afterAll(async () => {
    try {
        await cleanupTestData();
    } catch (error) {
        console.error("Error during cleanup:", error);
    } finally {
        await AppDataSource.destroy();
    }
});

describe("Borrow Routes", () => {
    test("POST /users/:userId/borrow/:bookId - Borrow a book", async () => {
        const response = await request(server).post(
            `/users/${userId}/borrow/${bookId}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            "message",
            "Book successfully borrowed"
        );
    });

    test("POST /users/:userId/return/:bookId - Return a book", async () => {
        const response = await request(server)
            .post(`/users/${userId}/return/${bookId}`)
            .send({ score: 4 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            "message",
            "Book returned successfully"
        );
    });

    test("POST /users/:userId/borrow/:bookId - Borrow a non-existent book", async () => {
        const response = await request(server).post(
            `/users/${userId}/borrow/999999`
        );

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Book not found");
    });

    test("POST /users/:userId/return/:bookId - Return a non-borrowed book", async () => {
        const response = await request(server)
            .post(`/users/${userId}/return/999999`)
            .send({ score: 4 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty(
            "message",
            "Book not found or already returned"
        );
    });
});
