import { Body, Controller,  Get,  Post, Req,  UseGuards, UseInterceptors } from '@nestjs/common';
import {  Signupdto } from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { Request } from 'express';
import { UsersInterceptor } from '../interceptors/users.interceptor';





@Controller('api')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('users/signup')
    signup(@Body() signupDto: Signupdto) {
      
    return this.authService.signup(signupDto);
    
 }

    @Post('users/login')
    // @UsePipes(new ValidationPipe())
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
    return req.user
       
    }

}
