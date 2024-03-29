import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRouters from './routes/user.route.js';
import authRouters from './routes/auth.route.js';
import postRouters from './routes/post.route.js';
import commentRouters from './routes/comment.route.js';

dotenv.config()

mongoose.connect(process.env.MONGODB).then(() => console.log('MongoDb is connected')).catch(error => console.log(error));

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouters);
app.use('/api/auth', authRouters);
app.use('/api/post', postRouters);
app.use('/api/comment', commentRouters);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000...')
});