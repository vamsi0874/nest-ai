import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { Chat } from '../schemas/Chat.schema';
import { UpdateChatDto } from '../dto/auth.dto';


@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
    
    async findChatById(chatId:string, userId: string) {
        return this.chatModel.findOne({ _id: chatId, userId });
    }

    async createChat(userId: string, text: string) {
        const newChat = new this.chatModel({
            userId,
            history: [{ role: "user", parts: [{ text }] }],
        });

        return await newChat.save();
    }

    
    async updateChat(chatId: string, userId: string, updateChatDto: UpdateChatDto) {
        const { question, answer, img } = updateChatDto;

        const newItems = [
            ...(question ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }] : []),
            { role: "model", parts: [{ text: answer }] },
        ];

        return this.chatModel.updateOne(
            { _id: chatId, userId },
            { $push: { history: { $each: newItems } } }
        );
    }
}
