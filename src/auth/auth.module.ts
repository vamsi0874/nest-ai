import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TUser, UserSchema } from '../schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TUser.name, schema: UserSchema },
    ]),

    PassportModule,

    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),

  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
  
}
