import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const REGISTER_USER_VALIDATOR = [
    body("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    body("firstName").notEmpty().isString().isLength({min:2}).withMessage("Provide a valid user first name"),
    body("lastName").notEmpty().isString().isLength({min:1}).withMessage("Provide a valid user last name"),
    body("password").isString().notEmpty().isLength({min:3}).withMessage("Must contain atleat 3 characters"),
    body("role").optional().notEmpty().isArray().withMessage("Role must not be empty and must be an array of strings"),

    validate
]

export const LOGIN_VALIDATOR = [
    body("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    validate
]
