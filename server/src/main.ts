import { NestFactory } from '@nestjs/core';
import { Module, Injectable } from '@nestjs/common';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

// ✅ User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

// ✅ Movie Schema
const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cast: { type: String, required: true },
    releaseDate: { type: String, required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ UsersService
@Injectable()
class UsersService {
  constructor(@InjectModel('User') private readonly userModel: mongoose.Model<any>) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword, role: 'user' });

    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '1h' }
    );

    return { token, role: user.role };
  }
}

// ✅ MoviesService
@Injectable()
class MoviesService {
  constructor(@InjectModel('Movie') private readonly movieModel: mongoose.Model<any>) {}

  async addMovie(
    name: string,
    cast: string,
    releaseDate: string,
    imageUrl: string,
    videoUrl: string,
    description: string
  ) {
    const movie = new this.movieModel({ name, cast, releaseDate, imageUrl, videoUrl, description });
    await movie.save();
    return { message: 'Movie added successfully' };
  }

  async getMovies() {
    return await this.movieModel.find();
  }

  async getMovieById(id: string) {
    return await this.movieModel.findById(id);
  }
}

// ✅ AppModule
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/movies'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Movie', schema: MovieSchema },
    ]),
  ],
  providers: [UsersService, MoviesService],
  exports: [UsersService, MoviesService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(require('body-parser').json());

  const usersService = app.get(UsersService);
  const moviesService = app.get(MoviesService);
  const expressApp = app.getHttpAdapter().getInstance();

  // ✅ Register API
  expressApp.post('/users/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const result = await usersService.register(name, email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // ✅ Login API
  expressApp.post('/users/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      const result = await usersService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

  // ✅ Add Movie API (Admin Only)
  expressApp.post('/movies/add', async (req, res) => {
    try {
      const { name, cast, releaseDate, imageUrl, videoUrl, description, token } = req.body;
  
      // Verify JWT Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY') as jwt.JwtPayload;
  
      if (!decoded || typeof decoded !== 'object' || decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      const result = await moviesService.addMovie(name, cast, releaseDate, imageUrl, videoUrl, description);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

  expressApp.post('/verify-token', async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY') as jwt.JwtPayload;
  
      if (!decoded || typeof decoded !== 'object' || !decoded.role) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      res.json({ role: decoded.role });
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  });

  // ✅ Get Movies API
  expressApp.get('/movies', async (req, res) => {
    try {
      const movies = await moviesService.getMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  expressApp.get('/movies/:id', async (req, res) => {
    try {
      const movie = await moviesService.getMovieById(req.params.id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
}

bootstrap();
