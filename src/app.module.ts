import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { NoticeModule } from './notice/notice.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, NoticeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
