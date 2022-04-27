import { Router } from 'express';
import { ClientComponent } from '../components';

const router: Router = Router();

router.get('/', ClientComponent.getAllClients);
router.get('/:id', ClientComponent.getClientById);

export default router;