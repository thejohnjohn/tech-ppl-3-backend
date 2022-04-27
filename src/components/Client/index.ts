import { NextFunction, Request, Response } from 'express';
import ClientRepository from './repository';
import { HttpError } from '@/config/error';

export async function getAllClients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
        const clients = await ClientRepository.getAllClients({ order: ['client_id'] });

        res.status(200).json(clients);
    }catch(error){
        next(new HttpError(error.message.status, error.message));
    }
}

export async function getClientById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
        const client = await ClientRepository.getClientById(req.params.id);

        res.status(200).json(client);
    }catch(error){
        next(new HttpError(error.message.status, error.message));
    }
}