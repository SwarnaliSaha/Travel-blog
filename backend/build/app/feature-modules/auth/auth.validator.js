"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN_VALIDATOR = exports.REGISTER_USER_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.REGISTER_USER_VALIDATOR = [
    (0, express_validator_1.body)("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    (0, express_validator_1.body)("firstName").notEmpty().isString().isLength({ min: 2 }).withMessage("Provide a valid user first name"),
    (0, express_validator_1.body)("lastName").notEmpty().isString().isLength({ min: 1 }).withMessage("Provide a valid user last name"),
    (0, express_validator_1.body)("password").isString().notEmpty().isLength({ min: 3 }).withMessage("Must contain atleat 3 characters"),
    (0, express_validator_1.body)("role").optional().notEmpty().isArray().withMessage("Role must not be empty and must be an array of strings"),
    validate_1.validate
];
exports.LOGIN_VALIDATOR = [
    (0, express_validator_1.body)("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    validate_1.validate
];
