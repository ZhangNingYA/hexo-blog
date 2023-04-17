import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guardh';
const qiniu = require('qiniu/index.js');

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
  @Get('upload')
  getUpload() {
    const accessKey = 'vGx8tF_jJYgWMeaBNs7BxqnQyga-7VgdicUJRBoY';
    const secretKey = 'fl5f5pe29uYCMCYYAyd_qldi8_gPC3G5FCqeY0CO';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: 'yierbao',
      expires: 7200,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return { uploadToken: putPolicy.uploadToken(mac) };
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
