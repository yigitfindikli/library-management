import { Router } from "express";
import userRoutes from "./userRoutes";
import bookRoutes from "./bookRoutes";
import borrowRoutes from "./borrowRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/users", borrowRoutes);

export default router;
