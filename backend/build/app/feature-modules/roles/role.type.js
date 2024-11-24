"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Roles = {
    admin: new mongoose_1.default.mongo.ObjectId("6743072060e4eeb133a41075"),
    user: new mongoose_1.default.mongo.ObjectId("6743072860e4eeb133a41078"),
};
