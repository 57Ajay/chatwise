import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: true });
  

const Friends = mongoose.model('Friends', FriendsSchema);


export default Friends;