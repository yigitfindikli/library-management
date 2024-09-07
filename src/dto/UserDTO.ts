import { IsString, IsNotEmpty, IsNumber, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class UserIdParamDTO {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    id!: number;
}
