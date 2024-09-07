import { IsInt, IsOptional, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class BorrowBookParamsDTO {
    @IsInt({ message: "userId must be an integer" })
    @Type(() => Number)
    userId!: number;

    @IsInt({ message: "bookId must be an integer" })
    @Type(() => Number)
    bookId!: number;
}

export class ReturnBookParamsDTO {
    @IsInt({ message: "userId must be an integer" })
    @Type(() => Number)
    userId!: number;

    @IsInt({ message: "bookId must be an integer" })
    @Type(() => Number)
    bookId!: number;
}

export class ReturnBookBodyDTO {
    @IsOptional()
    @IsInt({ message: "rating must be an integer" })
    @Min(1, { message: "Rating must be at least 1" })
    @Max(5, { message: "Rating must be at most 5" })
    rating?: number;
}
