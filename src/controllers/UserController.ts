import { Request, Response } from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../services/UserService";

export const GetAllUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch (error: any) {
        console.error("Error getting all users:", error.message);
        return res
            .status(500)
            .json({ message: "Error getting users", error: error.message });
    }
};

export const GetUserById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const user = await getUserById(Number(req.params.id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error: any) {
        console.error("Error getting user by id:", error.message);
        return res
            .status(500)
            .json({ message: "Error getting user", error: error.message });
    }
};

export const CreateUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const user = await createUser(req.body);
        return res.status(201).json(user);
    } catch (error: any) {
        console.error("Error creating user:", error.message);
        return res
            .status(500)
            .json({ message: "Error creating user", error: error.message });
    }
};

export const UpdateUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const user = await updateUser(Number(req.params.id), req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error: any) {
        console.error("Error updating user:", error.message);
        return res
            .status(500)
            .json({ message: "Error updating user", error: error.message });
    }
};

export const DeleteUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const result = await deleteUser(Number(req.params.id));
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(204).send();
    } catch (error: any) {
        console.error("Error deleting user:", error.message);
        return res
            .status(500)
            .json({ message: "Error deleting user", error: error.message });
    }
};
