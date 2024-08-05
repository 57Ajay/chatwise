"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
var user_controller_1 = require("../controllers/user.controller");
var userRouter = express_1.default.Router();
userRouter.post('/register', user_controller_1.registerUser);
userRouter.post('/login', user_controller_1.loginUser);
userRouter.post('/logout', verifyToken_1.default, user_controller_1.logOutUser);
userRouter.get('/profile', verifyToken_1.default, user_controller_1.userProfile);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map