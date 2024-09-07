import { Router } from "express";
import { BorrowBook, ReturnBook } from "../controllers/BorrowController";
import { validateRequest } from "../middleware/validate";
import {
    BorrowBookParamsDTO,
    ReturnBookParamsDTO,
    ReturnBookBodyDTO,
} from "../dto/BorrowDTO";

const router = Router();

router.post(
    "/:userId/borrow/:bookId",
    validateRequest(BorrowBookParamsDTO, "params"),
    BorrowBook
);
router.post(
    "/:userId/return/:bookId",
    validateRequest(ReturnBookParamsDTO, "params"),
    validateRequest(ReturnBookBodyDTO),
    ReturnBook
);

export default router;
