import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { TUser } from '../schemas/User.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthDto, Signupdto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(TUser.name) private userModel: Model<TUser>,
        private readonly jwtService: JwtService
    ) {}

    async signup({name,email,password}){
      
        const user = await this.userModel.findOne({email})

        if(user){
            throw new BadRequestException('Email already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            name,
            email,
            password: hashedPassword,
        });
    
        // Save user to the database
        const res = await newUser.save();
        
        const token = this.jwtService.sign({ userId: res._id, email: res.email });

        return {
            success: "User registered successfully",
            token,
            user:res
        };
    }

    // async login({email,token}) {
    //     return {
    //         message: 'Login successful',
    //         token
    //     };
    // }

    async validateUser(email: string, password: string) {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return null;
        }


        const isPasswordValid = await bcrypt.compare(password, user.password!);
        
        if (!isPasswordValid) {
            return null;
        }
        const token = this.jwtService.sign({ userId: user._id, email: user.email });

        return {
            token,
            name:user.name,
            email:user.email
        };
    }
}    