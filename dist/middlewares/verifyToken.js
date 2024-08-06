"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var JWT_SECRET = process.env.JWT_SECRET;
    var token;
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token && req.query.token) {
        token = req.query.token;
    }
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("decoded:\n", decoded);
        req.user = decoded;
        console.log("req.user:\n", req.user);
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map