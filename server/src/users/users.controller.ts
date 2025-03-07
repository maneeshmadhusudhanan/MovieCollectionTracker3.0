import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name); // ✅ Logger for debugging

  constructor(private readonly usersService: UsersService) {
    if (!this.usersService) {
      this.logger.error('❌ UsersService is not injected properly!');
    } else {
      this.logger.log('✅ UsersService is properly injected');
    }
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.register(body.name, body.email, body.password);
  }
}
