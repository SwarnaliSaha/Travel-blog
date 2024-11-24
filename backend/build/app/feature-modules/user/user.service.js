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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_repo_1 = __importDefault(require("./user.repo"));
const user_response_1 = require("./user.response");
// import { Roles } from "../roles/role.type";
const pipeline_1 = require("../../utility/pipeline");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield user_repo_1.default.create(user);
    if (!record)
        throw user_response_1.user_responses.user_not_created;
    return user_response_1.user_responses.user_created;
});
const updateOne = (filter, update) => {
    return user_repo_1.default.updateOne(filter, update);
};
const updateUser = (userId, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield user_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(userId) }, { $set: updateObject });
    if (!updated)
        throw user_response_1.user_responses.user_not_updated;
    return user_response_1.user_responses.user_updated;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield user_repo_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(userId) }, { $set: {
            isDeleted: true
        } });
    if (!deleted)
        throw user_response_1.user_responses.user_not_deleted;
    return user_response_1.user_responses.user_deleted;
});
const findUser = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield user_repo_1.default.findOne(filter);
    if (!foundUser)
        throw user_response_1.user_responses.user_not_found;
    return foundUser;
});
const ViewAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.createPipeline)(query);
    const result = yield user_repo_1.default.find(pipeline);
    return result;
});
exports.default = {
    createUser,
    updateUser,
    deleteUser,
    findUser,
    ViewAllUsers,
    updateOne
};
