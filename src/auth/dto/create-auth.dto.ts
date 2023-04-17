import {IsNotEmpty} from "class-validator";

export class CreateAuthDto {
    name:string;
    @IsNotEmpty()
    id:number;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    email:string;
}
