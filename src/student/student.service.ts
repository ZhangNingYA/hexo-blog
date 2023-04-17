import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto) {
    try {
      return await this.studentRepository.save(createStudentDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll() {
    return `This action returns all student`;
  }

  async findOne(id: number) {
    const student = await this.studentRepository
      .createQueryBuilder('student')
      .select([
        'student.id',
        'student.name',
        'student.age',
        'student.grade',
        'student.family',
        'student.requirement',
        'student.promise',
      ])
      .where('student.id = :id', { id: id })
      .getOne();
    if (!student) {
      throw new Error(`student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({
      where: { id },
    });
    if (!student) {
      throw new Error(`student with ID ${id} not found`);
    }
    const updatedClasses = Object.assign(student, updateStudentDto);
    return await this.studentRepository.save(updatedClasses);
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }

  async findAllStudents(number: number) {
    const student = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.classes', 'classes')
      .select([
        'student.id',
        'student.name',
        'student.age',
        'student.grade',
        'student.family',
        'student.requirement',
        'student.promise',
      ])
      .where('classes.id = :id', { id: number })
      .getMany();
    if (!student) {
      throw new Error(`student with ID ${number} not found`);
    } else {
      return student;
    }
  }
}
