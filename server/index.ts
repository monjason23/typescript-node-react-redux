import express from 'express';
import { config } from './config/config';
import connectToDb from './config/db';
import errorHandler from './middlewares/error.handler';
import requestLog from './middlewares/request.log';
import testRoutes from './routes/test.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
var cors = require('cors')

connectToDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLog);
app.use(cors())

app.use('/api/test', testRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use(errorHandler);


app.listen(config.server.port, () => {
    console.log(`Listening to port ${config.server.port}`)
})