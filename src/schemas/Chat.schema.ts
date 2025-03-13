import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Chat extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ type: [{ role: String, parts: [{ text: String }] }] })
    history: { role: string; parts: { text: string }[] }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
