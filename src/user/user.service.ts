import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const res = await this.userRepository.save(createUserDto);
      const { password, ...next } = res;
      return next;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        throw new Error('User already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllClass(userId): Promise<any> {
    return await this.userRepository.findOne({
      relations: ['classes'],
      where: {
        id: userId,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const res = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (res) return res;
    else throw new NotFoundException(`User with id ${id} not found`);
  }
  async findOneByEmail(email: string): Promise<User> {
    const res = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (res) return res;
    else throw new NotFoundException(`User with email ${email} not found`);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    const updatedUser = Object.assign(user, updateUserDto);
    const { password, ...rest } = await this.userRepository.save(updatedUser);
    return rest;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
