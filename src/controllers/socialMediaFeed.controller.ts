import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/apiResponse';
import ApiError from '../utils/apiError';
import Post from '../models/post.model';
import Friends from '../models/friends.model';

const getUserFeed = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id; // this we will be getting from our middleware
  // verifyToken which sets req.user to the decoded token

  try {
  
    const userFriends = await Friends.findOne({ user: userId });
    
    if (!userFriends) {
      return res.status(404).json(new ApiResponse('User friends not found', null, 404));
    }

   
    const friendsPosts = await Post.find({ user: { $in: userFriends.friends } })
      .sort({ createdAt: -1 })
      .populate('user', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');

  
    const postsWithFriendsComments = await Post.find({
      'comments.user': { $in: userFriends.friends },
      user: { $nin: userFriends.friends } 
    })
      .sort({ createdAt: -1 })
      .populate('user', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');

    const allPosts = [...friendsPosts, ...postsWithFriendsComments]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.status(200).json(new ApiResponse('User feed retrieved successfully', allPosts, 200));
  } catch (error) {
    res.status(500).json(new ApiError('Error retrieving user feed', 500));
  }
});

const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const newPost = new Post({
      user: userId,
      content
    });

    await newPost.save();

    res.status(201).json(new ApiResponse('Post created successfully', newPost, 201));
  } catch (error) {
    res.status(500).json(new ApiError('Error creating post', 500));
  }
});

const addComment = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json(new ApiResponse('Post not found', null, 404));
    }

    post.comments.push({
      user: userId,
      content
    });

    await post.save();

    res.status(200).json(new ApiResponse('Comment added successfully', post, 200));
  } catch (error) {
    res.status(500).json(new ApiError('Error adding comment', 500));
  }
});


const likePost = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json(new ApiResponse('Post not found', null, 404));
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json(new ApiResponse('Post already liked', null, 400));
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json(new ApiResponse('Post liked successfully', post, 200));
  } catch (error) {
    res.status(500).json(new ApiError('Error liking post', 500));
  }
});

export { getUserFeed, createPost, addComment, likePost };