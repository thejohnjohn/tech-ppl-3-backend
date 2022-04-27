import { Client } from "./model";

class ClientRepository {
    constructor(){}

    insertClient(client: any){
        Client.create()
    }

    getAllClients(options: any) {
        return Client.findAll(options);
    }

    getClientById(id: number | string) {
        return Client.findByPk(id);
    }
}

export default new ClientRepository();