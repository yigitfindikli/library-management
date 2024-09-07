import request from "supertest";
import { Application } from "express";
import { AppDataSource } from "../data-source";
import app from "../app";
import { Book } from "../models/Book";

let server: Application;

beforeAll(async () => {
    await AppDataSource.initialize();
    server = app;
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe("Book Routes", () => {
    let createdBookId: number;

    test("POST /books - Create a new book", async () => {
        const response = await request(server)
            .post("/books")
            .send({ name: "Test Book" });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test Book");

        createdBookId = response.body.id;
    });

    test("GET /books - Get all books", async () => {
        const response = await request(server).get("/books");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("GET /books/:id - Get a book by ID", async () => {
        const response = await request(server).get(`/books/${createdBookId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", createdBookId);
        expect(response.body.name).toBe("Test Book");
    });

    test("PUT /books/:id - Update a book", async () => {
        const response = await request(server)
            .put(`/books/${createdBookId}`)
            .send({ name: "Updated Test Book" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", createdBookId);
        expect(response.body.name).toBe("Updated Test Book");
    });

    test("DELETE /books/:id - Delete a book", async () => {
        const response = await request(server).delete(
            `/books/${createdBookId}`
        );

        expect(response.status).toBe(204);
    });

    test("GET /books/:id - Verify book is deleted", async () => {
        const response = await request(server).get(`/books/${createdBookId}`);

        expect(response.status).toBe(404);
    });
});
