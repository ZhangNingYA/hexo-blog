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
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guardh';

@UseGuards(JwtAuthGuard)
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto, @Req() req: any) {
    createClassDto.user = +req.user.id;
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }
  @Get('teacher/:id')
  findTeacher(@Param('id') id: string) {
    return this.classesService.findClassTeacherId(+id);
  }
  @Get('all/:id')
  findAllClasses(@Param('id') id: string) {
    return this.classesService.findAllClasses(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
    @Req() req: any,
  ) {
    const uid = await this.findOne(id);
    updateClassDto.user = req.user.id;
    if (req.user.id == uid[0].user.id)
      return this.classesService.update(+id, updateClassDto);
    else throw new Error('you cant update others classes');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
