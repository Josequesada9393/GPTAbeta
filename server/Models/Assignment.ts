import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from './index'

interface AssignmentAttributes {
    id: number;
    ownerId: string;
    text: string;
    responseMistakes: string;
    responseList: string;
    responseExpand: string
    studentId: number;
    titleId:number
}

interface AssignmentCreationAttributes extends Optional<AssignmentAttributes, "id"> {}

export class Assignment
    extends Model<AssignmentAttributes, AssignmentCreationAttributes>
    implements AssignmentAttributes {
        public id!: number;
        public ownerId!: string;
        public text!: string;
        public responseMistakes!: string;
        public responseList!: string;
        public responseExpand!: string;
        public studentId!: number;
        public titleId!: number;

        public readonly createdAt!: Date
}

    Assignment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey:true
            },
            ownerId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: new DataTypes.TEXT,
                allowNull: false
            },
            responseMistakes: {
                type: new DataTypes.TEXT,
                allowNull:false
            },
            responseList: {
                type: new DataTypes.TEXT,
                allowNull:false
            },
            responseExpand:{
                type: new DataTypes.TEXT,
                allowNull:false
            },
            studentId : {
                type: new DataTypes.INTEGER,
                allowNull: false
            },
            titleId : {
                type: new DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName:"assignments",
            sequelize
        }
    )




