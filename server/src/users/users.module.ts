import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])], 
  providers: [UsersService], // ✅ Ensure UsersService is provided
  controllers: [UsersController], // ✅ Ensure UsersController is registered
  exports: [UsersService], // ✅ Export UsersService if used elsewhere
})
export class UsersModule {}
