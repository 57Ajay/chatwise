import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  }, { timestamps: true });

const FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);

export default FriendRequest;
