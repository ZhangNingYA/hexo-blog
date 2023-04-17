import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Student} from "./entities/student.entity";
import {ClassesService} from "../classes/classes.service";
import {Classes} from "../classes/entities/class.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student,Classes])],
  controllers: [StudentController],
  providers: [StudentService,ClassesService]
})
export class StudentModule {}
