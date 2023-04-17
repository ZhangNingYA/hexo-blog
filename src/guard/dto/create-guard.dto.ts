import { ApiProperty } from "@nestjs/swagger";

export class CreateGuardDto {
    @ApiProperty({
        example: 'myName'
    })
    name: string;
    @ApiProperty({
        example: 'print age'
    })
    age: number

}
