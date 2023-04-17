import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateClassDto {
  @IsNotEmpty({
    message: '不能为空',
  })
  @IsString()
  @Length(1, 10, {
    message: '不能超过5个字符',
  })
  name: string;
  @IsNotEmpty()
  assistant: number;
  @IsNotEmpty()
  extra: string;
  @IsNotEmpty()
  blog: string;
  user: number;
}
