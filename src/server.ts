import express from 'express';
import { config } from './config/config';
import connectToDb from './config/db';
import errorHandler from './middlewares/error.handler';
import requestLog from './middlewares/request.log';
import testRoutes from './routes/test.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';

connectToDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLog);

app.use('/test', testRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use(errorHandler);


app.listen(config.server.port, () => {
    console.log(`Listening to port ${config.server.port}`)
})