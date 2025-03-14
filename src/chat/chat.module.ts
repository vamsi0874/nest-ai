import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from '../schemas/Chat.schema';
import { UserChatsService } from '../user-chat/user-chat.service';
import { UserChats, UserChatsSchema } from '../schemas/UserChat.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      {name: UserChats.name, schema: UserChatsSchema},
    ]),
    
  ],
  controllers: [ChatController],
  providers: [ChatService, UserChatsService]
})
export class ChatModule {}
