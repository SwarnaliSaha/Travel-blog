"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const UserSchema = new base_schema_1.BaseSchema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Role',
        required: true
    }
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
