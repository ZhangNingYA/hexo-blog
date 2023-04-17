import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter';
import { JwtStrategy } from './auth/jwt.strategy';
import { ClassesModule } from './classes/classes.module';
import { StudentModule } from './student/student.module';
import { BlogModule } from './blog/blog.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UserModule,
    LoginModule,
    GuardModule,
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ClassesModule,
    StudentModule,
    BlogModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
