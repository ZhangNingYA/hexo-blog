import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guardh';
import { ClassesService } from '../classes/classes.service';

@UseGuards(JwtAuthGuard)
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly classesService: ClassesService,
  ) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto, @Req() req: any) {
    createStudentDto.user = req.user.id;
    const id = await this.classesService.findClassTeacherId(
      createStudentDto.classes,
    );
    if (req.user.id === id) return this.studentService.create(createStudentDto);
    else throw new Error('this class is not yours');
  }

  // @Get()
  // findAll() {
  //   return this.studentService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentService.findOne(+id);
  }
  @Get('all/:id')
  findAllStudents(@Param('id') id: number) {
    return this.studentService.findAllStudents(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Req() req,
  ) {
    const uid = await this.classesService.findClassTeacherId(
      updateStudentDto.classes,
    );
    const teacher = await this.findOne(+id);
    if (req.user.id === uid && uid === teacher.user.id)
      return this.studentService.update(+id, updateStudentDto);
    else throw new Error('this class is not yours');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
