import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.userService.findOneByEmail(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async login(user: User) {
    const { password, ...payload } = user;
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }
}
