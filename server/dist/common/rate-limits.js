"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitsConfig = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.RateLimitsConfig = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 750,
    message: "Too many requests, please try again later.",
});
//# sourceMappingURL=rate-limits.js.map