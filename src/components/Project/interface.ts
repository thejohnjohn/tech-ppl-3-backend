import { EmployeeModel } from "../Employee/model";
import { ClientModel } from "../Client/model";

export interface ProjectModel{
    projectName: string;
    projectOwner: { id: String };
    techHourQuantity: number;
    deadline: Date;
    projectPriority: string;
    projectDescription: string;
    projectLeader: { id: String };
}