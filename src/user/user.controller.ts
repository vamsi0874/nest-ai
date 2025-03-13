import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { name: string; email: string; age: number }) {
    return this.usersService.createUser(body.name, body.email, body.age);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}
