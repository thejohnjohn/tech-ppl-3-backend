import { Client } from "./model";

class ClientRepository {
    constructor(){}

    getAllClients(options: any) {
        return Client.findAll(options);
    }

    getClientById(id: number | string = 1) {
        return Client.findByPk(id);
    }
}

export default new ClientRepository();