import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateFileDto {
  @IsNotEmpty({
    message: '不能为空',
  })
  @IsString()
  @Length(1, 10, {
    message: '不能超过5个字符',
  })
  name: string;
  @IsNotEmpty()
  path: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  size: number;
  @IsNotEmpty()
  blog: number;
}
