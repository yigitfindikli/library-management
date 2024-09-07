import { IsString, IsNotEmpty, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateBookDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class UpdateBookDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class BookIdParamDTO {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    id!: number;
}
