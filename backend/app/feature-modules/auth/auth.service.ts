import { compare, genSalt, hash } from "bcryptjs";
import userService from "../user/user.service";
import { IUser } from "../user/user.type";
import { Roles } from "../roles/role.type";
import { ICredential, Payload } from "./auth.type";
import { AUTH_RESPONSES } from "./auth.response";
import jwt, { verify } from 'jsonwebtoken';
import fs from "fs"
import path from "path"

const encryptedPassword = async (user:IUser)=>{
    const salt = await genSalt(10);
    
    const hashedPassword = await hash(user.password,salt);
    user.password = hashedPassword;
    return user;
}

const registerUser = async(user:IUser)=>{
    user = await encryptedPassword(user);
    user.role = [Roles.user];
    
    const record = userService.createUser(user);

    return record;
}

const login = async (cred: ICredential) => {
    const user = await userService.findUser({ email: cred.email })

    if (!user) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;

    const isPasswordValid = await compare(cred.password, user.password);
    if (!isPasswordValid) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;
    const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "..\\keys\\private.pem"), { encoding: "utf-8" })
    const { _id, role } = user;

    try {
        const token = jwt.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256',expiresIn:'900s' });
        return { token,role };

    } catch (error) {
        console.log(error)
    }

}

export default {
    registerUser,
    login
}