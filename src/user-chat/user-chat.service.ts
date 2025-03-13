import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserChats } from '../schemas/UserChat.schema';

@Injectable()
export class UserChatsService {
    constructor(@InjectModel(UserChats.name) private userChatsModel: Model<UserChats>) {}

    async findUserChats(userId: string) {
        return this.userChatsModel.find({ userId });
    }

    async createUserChats(userId: string, chatId: string, text: string) {
        const newUserChats = new this.userChatsModel({
            userId,
            chats: [{ _id: chatId, title: text.substring(0, 40) }],
        });

        return await newUserChats.save();
    }

    async updateUserChats(userId: string, chatId: string, text: string) {
        return await this.userChatsModel.updateOne(
            { userId },
            { $push: { chats: { _id: chatId, title: text.substring(0, 40) } } }
        );
    }
}
