import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Blog} from "./entities/blog.entity";

@Injectable()
export class BlogService {
  constructor(
      @InjectRepository(Blog)
      private readonly blogRepository: Repository<Blog>,
  ) {}
  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  async findAll() {
    const res = await this.blogRepository.find({ relations: ['user'],where:{
    }
    })
    if(res) return res;
    else throw new NotFoundException(`cant find all blogs`);
  }




  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
