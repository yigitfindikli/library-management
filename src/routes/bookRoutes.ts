import { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { CreateBookDTO, UpdateBookDTO, BookIdParamDTO } from "../dto/BookDTO";
import {
    GetAllBooks,
    GetBookById,
    CreateBook,
    UpdateBook,
    DeleteBook,
} from "../controllers/BookController";

const router = Router();

router.get("/", GetAllBooks);
router.get("/:id", validateRequest(BookIdParamDTO, "params"), GetBookById);
router.post("/", validateRequest(CreateBookDTO), CreateBook);
router.put(
    "/:id",
    validateRequest(BookIdParamDTO, "params"),
    validateRequest(UpdateBookDTO),
    UpdateBook
);
router.delete("/:id", validateRequest(BookIdParamDTO, "params"), DeleteBook);

export default router;
