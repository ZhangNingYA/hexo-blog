import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './entities/class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>,
  ) {}
  async create(createClassDto) {
    try {
      return await this.classesRepository.save(createClassDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll() {
    return `This action returns all classes`;
  }

  async findOne(id: number) {
    const classes = await this.classesRepository.find({
      relations: ['user'],
      where: {
        id: id,
      },
    });
    if (!classes) {
      throw new Error(`classes with ID ${id} not found`);
    }
    return classes;
  }

  async findAllClasses(id: number) {
    const res = await this.classesRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.user', 'user')
      .select([
        'classes.id',
        'classes.blog',
        'classes.extra',
        'classes.name',
        'user.id',
        'user.name',
        'user.email',
        // 'user.password',
      ])
      .where('user.id = :id', { id: id })
      .getMany();
    if (!res) {
      throw new Error(`classes with id ${id} not found`);
    }
    return res;
  }
  async findClassTeacherId(id: number) {
    const classes = await this.classesRepository.find({
      relations: ['user'],
      where: {
        //find by teacher id
        id: id,
      },
    });
    if (!classes) {
      throw new Error(`classes with id ${id} not found`);
    }
    return classes[0].user.id;
  }

  async update(id: number, updateClassDto) {
    const classes = await this.classesRepository.findOne({
      where: { id },
    });
    if (!classes) {
      throw new Error(`classes with ID ${id} not found`);
    }
    const updatedClasses = Object.assign(classes, updateClassDto);
    return await this.classesRepository.save(updatedClasses);
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
