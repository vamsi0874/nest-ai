import { Controller, Get, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UserChatsService } from './user-chat.service';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('api')
export class UserChatController {
    
    constructor(
        
        private readonly userChatsService: UserChatsService
    ) {}
    @Get('userchats')
    @UseGuards(JwtAuthGuard)
    async getUserChats(@Req() req) {
        const userId = req.user.userId;

        try {
            const userChats = await this.userChatsService.findUserChats(userId);
            return userChats[0]?.chats || [];
        } catch (err) {
            throw new HttpException('Error fetching user chats!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
