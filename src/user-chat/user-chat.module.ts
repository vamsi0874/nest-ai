import { Module } from '@nestjs/common';
import { UserChatController } from './user-chat.controller';
import { UserChatsService } from './user-chat.service';
import { UserChats, UserChatsSchema } from '../schemas/UserChat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserChats.name, schema: UserChatsSchema },
    ]),
  ],
  controllers: [UserChatController],
  providers: [UserChatsService]
})
export class UserChatModule {}
