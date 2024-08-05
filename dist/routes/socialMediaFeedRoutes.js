"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socialMediaFeed_controller_1 = require("../controllers/socialMediaFeed.controller");
var verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
var feedRouter = express_1.default.Router();
feedRouter.use(verifyToken_1.default);
feedRouter.get('/all-feed', socialMediaFeed_controller_1.getUserFeed);
feedRouter.post('/post', socialMediaFeed_controller_1.createPost);
feedRouter.post('/post/:postId/comment', socialMediaFeed_controller_1.addComment);
feedRouter.post('/post/:postId/like', socialMediaFeed_controller_1.likePost);
exports.default = feedRouter;
//# sourceMappingURL=socialMediaFeedRoutes.js.map