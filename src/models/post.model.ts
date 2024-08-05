import mongoose from "mongoose";
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }
  }, { timestamps: true });

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [CommentSchema]
  }, { timestamps: true });


const Post = mongoose.model('Post', PostSchema);

export default Post;