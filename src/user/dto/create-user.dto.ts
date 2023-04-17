import { IsNotEmpty, IsString, Length } from 'class-validator'
export class CreateUserDto {
    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString()
    @Length(1,5, {
        message:"不能超过5个字符"
    })
    name: string;
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    role:string;
}
