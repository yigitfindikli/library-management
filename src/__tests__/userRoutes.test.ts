import request from "supertest";
import { Application } from "express";
import { AppDataSource } from "../data-source";
import app from "../app";

let server: Application;
let createdUserId: number;

beforeAll(async () => {
    await AppDataSource.initialize();
    server = app;
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe("User Routes", () => {
    test("POST /users - Create a new user", async () => {
        const response = await request(server)
            .post("/users")
            .send({ name: "Test User" });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test User");

        createdUserId = response.body.id;
    });

    test("GET /users - Get all users", async () => {
        const response = await request(server).get("/users");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("GET /users/:id - Get a user by ID", async () => {
        const response = await request(server).get(`/users/${createdUserId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", createdUserId);
        expect(response.body.name).toBe("Test User");
    });

    test("PUT /users/:id - Update a user", async () => {
        const response = await request(server)
            .put(`/users/${createdUserId}`)
            .send({ name: "Updated Test User" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", createdUserId);
        expect(response.body.name).toBe("Updated Test User");
    });

    test("DELETE /users/:id - Delete a user", async () => {
        const response = await request(server).delete(
            `/users/${createdUserId}`
        );

        expect(response.status).toBe(204);
    });

    test("GET /users/:id - Verify user is deleted", async () => {
        const response = await request(server).get(`/users/${createdUserId}`);

        expect(response.status).toBe(404);
    });
});
