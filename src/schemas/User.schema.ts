import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// import { UserSettings } from './UserSettings.schema';
// import { Post } from './Post.schema';

@Schema()
export class TUser extends Document {
  @Prop({  required: false })
  name?: string;

  @Prop({ required: true })
  email?: string;

  @Prop({ required: false })
  avatarUrl?: string;
  
  @Prop({ required: true })
  password?: string;

//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
//   settings?: UserSettings;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
//   posts: Post[];

}

export const UserSchema = SchemaFactory.createForClass(TUser);