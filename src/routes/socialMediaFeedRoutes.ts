import express from 'express';
import { getUserFeed, createPost, addComment, likePost } from '../controllers/socialMediaFeed.controller';
import verifyToken from '../middlewares/verifyToken';

const feedRouter = express.Router();
feedRouter.use(verifyToken)
feedRouter.get('/all-feed', getUserFeed);
feedRouter.post('/post', createPost);
feedRouter.post('/post/:postId/comment', addComment);
feedRouter.post('/post/:postId/like', likePost);

export default feedRouter;