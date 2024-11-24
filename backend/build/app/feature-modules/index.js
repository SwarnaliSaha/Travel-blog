"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const role_router_1 = __importDefault(require("./roles/role.router"));
const user_router_1 = __importDefault(require("./user/user.router"));
exports.default = {
    AuthRouter: auth_router_1.default,
    RoleRouter: role_router_1.default,
    UserRouter: user_router_1.default,
};
