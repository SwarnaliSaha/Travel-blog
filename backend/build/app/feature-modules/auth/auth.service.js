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
const bcryptjs_1 = require("bcryptjs");
const user_service_1 = __importDefault(require("../user/user.service"));
const role_type_1 = require("../roles/role.type");
const auth_response_1 = require("./auth.response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const encryptedPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(10);
    const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, salt);
    user.password = hashedPassword;
    return user;
});
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user = yield encryptedPassword(user);
    user.role = [role_type_1.Roles.user];
    const record = user_service_1.default.createUser(user);
    return record;
});
const login = (cred) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.default.findUser({ email: cred.email });
    if (!user)
        throw auth_response_1.AUTH_RESPONSES.INVALID_USER_CREDENTIALS;
    const isPasswordValid = yield (0, bcryptjs_1.compare)(cred.password, user.password);
    if (!isPasswordValid)
        throw auth_response_1.AUTH_RESPONSES.INVALID_USER_CREDENTIALS;
    const PRIVATE_KEY = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..\\keys\\private.pem"), { encoding: "utf-8" });
    const { _id, role } = user;
    try {
        const token = jsonwebtoken_1.default.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256', expiresIn: '900s' });
        return { token, role };
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = {
    registerUser,
    login
};
