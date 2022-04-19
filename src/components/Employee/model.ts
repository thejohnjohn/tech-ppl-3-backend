import { Model, DataTypes } from "sequelize/types";

export class Employee extends Model{
    public name!: string;
    public email!: string;
    public phone!: string;
    public job!: string;
    public photo!: string;
    public payment!: number;
}