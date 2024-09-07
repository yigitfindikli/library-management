import { User } from "../models/User";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (): Promise<User[]> => {
    try {
        return await userRepository.find();
    } catch (error) {
        console.error("Database error fetching users:", error);
        throw new Error("Could not fetch users");
    }
};

export const getUserById = async (id: number): Promise<User | null> => {
    try {
        return await userRepository.findOneBy({ id });
    } catch (error) {
        console.error("Database error fetching user:", error);
        throw new Error("Could not fetch user");
    }
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
    try {
        const user = userRepository.create(userData);
        return await userRepository.save(user);
    } catch (error) {
        console.error("Database error creating user:", error);
        throw new Error("Could not create user");
    }
};

export const updateUser = async (
    id: number,
    userData: Partial<User>
): Promise<User | null> => {
    try {
        const user = await getUserById(id);
        if (!user) return null;

        Object.assign(user, userData);
        return await userRepository.save(user);
    } catch (error) {
        console.error("Database error updating user:", error);
        throw new Error("Could not update user");
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const result = await userRepository.delete(id);
        return result.affected !== 0;
    } catch (error) {
        console.error("Database error deleting user:", error);
        throw new Error("Could not delete user");
    }
};
