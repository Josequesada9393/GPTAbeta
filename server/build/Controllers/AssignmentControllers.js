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
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
const Assignment_1 = require("../Models/Assignment");
const Helpers_1 = require("../Middleware/Helpers");
const Promts_1 = require("../Prompts/Promts");
dotenv_1.default.config();
exports.default = {
    aiPost: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            //creates config and calls ai to make feedback
            const body = ctx.request.body;
            const content = body.content;
            const studentId = body.studentId;
            const titleId = body.titleId;
            const configuration = new openai_1.Configuration({
                apiKey: "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"
            });
            const openai = new openai_1.OpenAIApi(configuration);
            //FIRST AI CALL
            const aiResponse1 = yield openai.createChatCompletion((0, Helpers_1.aiProp)(`${Promts_1.AIPromptTextWithErros} + """${content}"""`));
            const feedback1 = JSON.stringify((_a = aiResponse1.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content);
            // SECOND AI CALL
            const aiResponse2 = yield openai.createChatCompletion((0, Helpers_1.aiProp)(`${Promts_1.AIPromptListOfErrors} + """${feedback1}"""`));
            const feedback2 = JSON.stringify((_b = aiResponse2.data.choices[0].message) === null || _b === void 0 ? void 0 : _b.content);
            // //THIRD AI CALL
            const aiResponse3 = yield openai.createChatCompletion((0, Helpers_1.aiProp)(`${Promts_1.AIPromtExpandKnowledge} + """${content}"""`));
            const feedback3 = JSON.stringify((_c = aiResponse3.data.choices[0].message) === null || _c === void 0 ? void 0 : _c.content);
            // COMBINES AI CALLS WITH WITH REMOVABLE ELEMENT INBETWEEN
            // const feedback = feedback1 + "-+-" + feedback2 + "-+-" + feedback3
            // calls auth0 for usertoken and extracts email
            const userEmail = yield (0, Helpers_1.getAuth0Email)(ctx);
            const updateCheck = yield Assignment_1.Assignment.findOne({ where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId } });
            if (!updateCheck) {
                const response = yield Assignment_1.Assignment.create({ ownerId: JSON.stringify(userEmail), text: JSON.stringify(content), responseMistakes: feedback1, responseList: feedback2, responseExpand: feedback3, titleId: titleId, studentId: studentId });
                ctx.body = { responseMistakes: response.dataValues.responseMistakes,
                    responseList: response.dataValues.responseList,
                    responseExpand: response.dataValues.responseExpand };
            }
            else {
                const response = yield Assignment_1.Assignment.update({ text: JSON.stringify(content), responseMistakes: feedback1, responseList: feedback2, responseExpand: feedback3, }, { where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId }, returning: true });
                ctx.body = { responseMistakes: response[1][0].dataValues.responseMistakes,
                    responseList: response[1][0].dataValues.responseList,
                    responseExpand: response[1][0].dataValues.responseExpand
                };
            }
            // console.log(feedback)
            // ctx.body = feedback
        }
        catch (error) {
            console.log(error);
            ctx.body = { responseMistakes: 'oops something went wrong',
                responseList: '',
                responseExpand: ''
            };
        }
    }),
    getAssignment: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = ctx.params;
            const userEmail = yield (0, Helpers_1.getAuth0Email)(ctx);
            const studentId = parseInt(body.studentId);
            const titleId = parseInt(body.titleId);
            const response = yield Assignment_1.Assignment.findOne({ where: { studentId: studentId, ownerId: JSON.stringify(userEmail), titleId: titleId } });
            ctx.status = 200;
            ctx.body = response ? { responseMistakes: response.dataValues.responseMistakes,
                responseList: response.dataValues.responseList,
                responseExpand: response.dataValues.responseExpand } : { text: null };
        }
        catch (error) {
            ctx.status = 500;
            console.log(error);
        }
    })
};
