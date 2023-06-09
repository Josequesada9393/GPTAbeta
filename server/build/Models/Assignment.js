"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Assignment extends sequelize_1.Model {
}
exports.Assignment = Assignment;
Assignment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ownerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: new sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    responseMistakes: {
        type: new sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    responseList: {
        type: new sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    responseExpand: {
        type: new sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    studentId: {
        type: new sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    titleId: {
        type: new sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "assignments",
    sequelize: index_1.sequelize
});
