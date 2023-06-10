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
exports.getAuth0Email = exports.aiProp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
//creates prompt for ai
const aiProp = (string) => {
    return {
        model: "gpt-3.5-turbo",
        messages: [{
                role: 'user',
                content: string
            }],
        temperature: 0,
        max_tokens: 500,
    };
};
exports.aiProp = aiProp;
//gets email from auth0 token
// export const getAuth0Email = async (ctx: Context) => {
//     const accessToken = await ctx.get('authorization').split(' ')[1]
//     const authResponse = await fetch('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
//         headers: {
//             authorization: `Bearer ${accessToken}`
//         }
//     });
//     const userInfo:any = await authResponse.json()
//     return userInfo.email
// }
const getAuth0Email = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield ctx.get('authorization').split(' ')[1];
    const authResponse = yield axios_1.default.get('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const userInfo = authResponse.data;
    return userInfo.email;
});
exports.getAuth0Email = getAuth0Email;
