import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('guard')
@ApiTags('守卫接口')
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  // @Role('admin')
  @ApiQuery({
    name: 'pages',
    description: '分页信息',
  })
  @ApiResponse({
    status: 403,
    description: '返回的装饰器状态码为403',
  })
  @SetMetadata('role', ['admin'])
  @ApiOperation({
    summary: 'get接口',
    description: '获取了guard的不传参请求',
  })
  findAll() {
    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是一个id',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
