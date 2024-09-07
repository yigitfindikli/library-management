import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateRequest(
    dtoClass: any,
    source: "body" | "params" = "body"
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObj = plainToInstance(
            dtoClass,
            source === "body" ? req.body : req.params
        );
        const errors = await validate(dtoObj);
        if (errors.length > 0) {
            const messages = errors.map((error: ValidationError) =>
                Object.values(error.constraints || {}).join(", ")
            );
            return res.status(400).json({ errors: messages });
        }
        next();
    };
}
