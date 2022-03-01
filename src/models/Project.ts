export default class Project {
  projectName: string;
  //Dono do Projeto (a ID do cliente)
  projectOwner: string;
  techHoursQuantity: number;
  deadline: string; // Date
  projectPriority: string;
  projectBriefing: string;
  projectLeader: string;
  techHoursQuantity: number;
  projectTeam: string[]; // Can be a Map

  static message(): string {
    return 'Hello World'
  }
}
