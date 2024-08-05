"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var FriendsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
var Friends = mongoose_1.default.model('Friends', FriendsSchema);
exports.default = Friends;
//# sourceMappingURL=friends.model.js.map