import { IsNotEmpty, IsString, Length } from 'class-validator'
export class CreateLoginDto {
    @IsNotEmpty({

    })
    @IsString()
    @Length(1,5, {
        message:"不能超过一个字符"
    })
    name: string;
    @IsNotEmpty()
    age:number;
}
