import { Router } from "express";
import {
    GetAllUsers,
    GetUserById,
    CreateUser,
    UpdateUser,
    DeleteUser,
} from "../controllers/UserController";
import { validateRequest } from "../middleware/validate";
import { CreateUserDTO, UpdateUserDTO, UserIdParamDTO } from "../dto/UserDTO";

const router = Router();

router.get("/", GetAllUsers);
router.get("/:id", validateRequest(UserIdParamDTO, "params"), GetUserById);
router.post("/", validateRequest(CreateUserDTO), CreateUser);
router.put(
    "/:id",
    validateRequest(UserIdParamDTO, "params"),
    validateRequest(UpdateUserDTO),
    UpdateUser
);
router.delete("/:id", validateRequest(UserIdParamDTO, "params"), DeleteUser);

export default router;
