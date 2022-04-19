import { NextFunction, Request, Response } from 'express';
import ClientRepository from './repository';

export async function getAllClients(req: Request, res: Response, next: NextFunction){
    try{
        const clients = await ClientRepository.getAllClients({ order: ['id'] });

        res.status(200).json(clients);
    }catch(error){
        console.log(error);
    }
}