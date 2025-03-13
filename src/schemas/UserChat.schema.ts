import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserChats extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({
        type: [{ _id: String, title: String, createdAt: { type: Date, default: Date.now } }],
    })
    chats: { _id: string; title: string; createdAt: Date }[];
}

export const UserChatsSchema = SchemaFactory.createForClass(UserChats);
