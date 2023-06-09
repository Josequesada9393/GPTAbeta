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
const dotenv_1 = __importDefault(require("dotenv"));
const Student_1 = require("../Models/Student");
const Helpers_1 = require("../Middleware/Helpers");
dotenv_1.default.config();
exports.default = {
    getStudentInfo: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const StudentId = ctx.params;
            const studentProfile = yield Student_1.Student.findOne({ where: StudentId });
            ctx.body = studentProfile;
            ctx.status = 200;
        }
        catch (error) {
            console.log(error);
        }
    }),
    addStudent: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = ctx.request.body;
            const content = body.name;
            let ownerId;
            try {
                ownerId = yield (0, Helpers_1.getAuth0Email)(ctx);
            }
            catch (_a) {
                ownerId = 'test';
            }
            yield Student_1.Student.create({ ownerId: ownerId, name: content });
            ctx.body = yield Student_1.Student.findAll({ where: { ownerId: ownerId } });
            ctx.status = 201;
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
        }
    }),
    deleteOne: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const StudentName = ctx.params;
            const ownerId = yield (0, Helpers_1.getAuth0Email)(ctx);
            yield Student_1.Student.destroy({ where: { id: StudentName.id } });
            ctx.body = yield Student_1.Student.findAll({ where: { ownerId: ownerId } });
        }
        catch (error) {
            console.log(error);
        }
    })
};
