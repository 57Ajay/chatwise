"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var socialMediaFeedRoutes_1 = __importDefault(require("./routes/socialMediaFeedRoutes"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/api/user', user_route_1.default);
app.use("/api/feed", socialMediaFeedRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map