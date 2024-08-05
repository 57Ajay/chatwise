"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.addComment = exports.createPost = exports.getUserFeed = void 0;
var asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
var apiResponse_1 = __importDefault(require("../utils/apiResponse"));
var apiError_1 = __importDefault(require("../utils/apiError"));
var post_model_1 = __importDefault(require("../models/post.model"));
var friends_model_1 = __importDefault(require("../models/friends.model"));
var getUserFeed = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userFriends, friendsPosts, postsWithFriendsComments, allPosts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, friends_model_1.default.findOne({ user: userId })];
            case 2:
                userFriends = _a.sent();
                if (!userFriends) {
                    return [2 /*return*/, res.status(404).json(new apiResponse_1.default('User friends not found', null, 404))];
                }
                return [4 /*yield*/, post_model_1.default.find({ user: { $in: userFriends.friends } })
                        .sort({ createdAt: -1 })
                        .populate('user', 'username profilePicture')
                        .populate('comments.user', 'username profilePicture')];
            case 3:
                friendsPosts = _a.sent();
                return [4 /*yield*/, post_model_1.default.find({
                        'comments.user': { $in: userFriends.friends },
                        user: { $nin: userFriends.friends }
                    })
                        .sort({ createdAt: -1 })
                        .populate('user', 'username profilePicture')
                        .populate('comments.user', 'username profilePicture')];
            case 4:
                postsWithFriendsComments = _a.sent();
                allPosts = __spreadArray(__spreadArray([], friendsPosts, true), postsWithFriendsComments, true).sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); });
                res.status(200).json(new apiResponse_1.default('User feed retrieved successfully', allPosts, 200));
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                res.status(500).json(new apiError_1.default('Error retrieving user feed', 500));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.getUserFeed = getUserFeed;
var createPost = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content, userId, newPost, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                userId = req.user._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                newPost = new post_model_1.default({
                    user: userId,
                    content: content
                });
                return [4 /*yield*/, newPost.save()];
            case 2:
                _a.sent();
                res.status(201).json(new apiResponse_1.default('Post created successfully', newPost, 201));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json(new apiError_1.default('Error creating post', 500));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.createPost = createPost;
var addComment = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, content, userId, post, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                content = req.body.content;
                userId = req.user._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, post_model_1.default.findById(postId)];
            case 2:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(404).json(new apiResponse_1.default('Post not found', null, 404))];
                }
                post.comments.push({
                    user: userId,
                    content: content
                });
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                res.status(200).json(new apiResponse_1.default('Comment added successfully', post, 200));
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(500).json(new apiError_1.default('Error adding comment', 500));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.addComment = addComment;
var likePost = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userId, post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                userId = req.user._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, post_model_1.default.findById(postId)];
            case 2:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(404).json(new apiResponse_1.default('Post not found', null, 404))];
                }
                if (post.likes.includes(userId)) {
                    return [2 /*return*/, res.status(400).json(new apiResponse_1.default('Post already liked', null, 400))];
                }
                post.likes.push(userId);
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                res.status(200).json(new apiResponse_1.default('Post liked successfully', post, 200));
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).json(new apiError_1.default('Error liking post', 500));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.likePost = likePost;
//# sourceMappingURL=socialMediaFeed.controller.js.map