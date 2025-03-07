// const { NestFactory } = require('@nestjs/core');
// const { Module, Injectable } = require('@nestjs/common');
// const { MongooseModule, InjectModel } = require('@nestjs/mongoose');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const dotenv = require('dotenv');

// dotenv.config();

// // ✅ User Schema
// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'user' },
// }, { timestamps: true });

// // ✅ UsersService (Handles logic)
// @Injectable()
// class UsersService {
//   constructor(userModel) {
//     this.userModel = userModel;
//   }

//   @InjectModel('User')
//   userModel;

//   async register(name, email, password) {
//     const existingUser = await this.userModel.findOne({ email });
//     if (existingUser) throw new Error('User already exists');

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new this.userModel({ name, email, password: hashedPassword, role: 'user' });
//     await user.save();
//     return { message: 'User registered successfully' };
//   }
// }

// // ✅ Main App Module (No Controller Needed!)
// @Module({
//   imports: [
//     MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/movies'),
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//   ],
//   providers: [UsersService],
// })
// class AppModule {}

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   app.use(require('body-parser').json()); // ✅ Fix: Enable JSON body parsing

//   // ✅ Register User API Route Directly
//   const usersService = app.get(UsersService);

//   app.post('/users/register', async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       if (!name || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//       }
//       const result = await usersService.register(name, email, password);
//       res.json(result);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   await app.listen(3000);
//   console.log(`🚀 Server running on http://localhost:3000`);
// }

// bootstrap();
