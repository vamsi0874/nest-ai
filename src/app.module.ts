import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UserChatModule } from './user-chat/user-chat.module';
import { UploadController } from './upload/upload.controller';
// import { UploadController } from './upload/upload.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsersModule,
    AuthModule,
    ChatModule,
    UserChatModule,
  ],
  controllers: [AppController,UploadController],
  providers: [AppService],
})
export class AppModule {}

