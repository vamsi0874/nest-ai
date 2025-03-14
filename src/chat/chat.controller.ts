import { Controller, Post, Body, Req, UseGuards, HttpException, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserChatsService } from '../user-chat/user-chat.service';
// import { AuthGuard } from '../auth/auth.guard'; 
import { CreateChatDto, UpdateChatDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Request } from 'express';


interface User {
    userId: string;
}

@Controller('api')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly userChatsService: UserChatsService
    ) {}

        // 🔹 GET /chats/:id - Fetch a specific chat
        @Get('chats/:id')
        @UseGuards(JwtAuthGuard)
        async getChatById(@Req() req,  @Param('id') ChatId: string) {
            
            
            const userId = req.user.userId;
    
            try {
                const chat = await this.chatService.findChatById(ChatId, userId);
                if (!chat) {
                    throw new HttpException('Chat not found!', HttpStatus.NOT_FOUND);
                }
                return chat;
            } catch (err) {
                throw new HttpException('Error fetching chat!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


    @Post('chats')
    @UseGuards(JwtAuthGuard)  // Protect the route
    async createChat(@Req() req: Request & { user: User }, @Body() createChatDto: CreateChatDto) {
        // console.log('user',req.user)
        const userId = req.user?.userId;
        const { text } = createChatDto;

        try {
            console.log('userId', userId);

            // Create and save the chat
            const newChat = await this.chatService.createChat(userId, text);

            // Check if user chats exist
            const userChats = await this.userChatsService.findUserChats(userId);

            if (!userChats.length) {
                // Create new UserChats entry if none exist
                await this.userChatsService.createUserChats(userId, newChat._id as string, text);
            } else {
                // Update existing UserChats with new chat
                await this.userChatsService.updateUserChats(userId, newChat._id as string, text);
            }

            return { chatId: newChat._id };
         
        } catch (err) {
            throw new HttpException('Error creating chat!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

      // 🔹 PUT /chats/:id - Update chat (add conversation)
      @Put('chats/:id')
      @UseGuards(JwtAuthGuard)
      async updateChat(@Req() req, @Param() param: { id: string }, @Body() updateChatDto: UpdateChatDto) {
          const userId = req.user.userId;
          const chatId = param.id
         
          try {
              const updatedChat = await this.chatService.updateChat(chatId, userId, updateChatDto);
              return updatedChat;
          } catch (err) {
              throw new HttpException('Error adding conversation!', HttpStatus.INTERNAL_SERVER_ERROR);
          }
      }
}
