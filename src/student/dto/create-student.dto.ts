import { IsNotEmpty, IsString, Length } from 'class-validator'
export class CreateStudentDto {
    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString()
    @Length(1,20, {
        message:"不能超过5个字符"
    })
    name: string;
    @IsNotEmpty()
    grade:string;
    @IsNotEmpty()
    age:number;
    @IsNotEmpty()
    family:string;
    @IsNotEmpty()
    requirement:string;
    @IsNotEmpty()
    promise:string;
    user:string;
    @IsNotEmpty()
    classes:number;
    id:number;
}


