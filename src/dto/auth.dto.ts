import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class Signupdto {
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}



export class CreateChatDto {
    @IsString()
    text: string;
}



export class UpdateChatDto {
    @IsOptional()
    @IsString()
    question?: string;

    @IsString()
    answer: string;

    @IsOptional()
    @IsString()
    img?: string;
}
