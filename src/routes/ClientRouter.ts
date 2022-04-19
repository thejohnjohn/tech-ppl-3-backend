import { Router } from 'express';
import { ClientComponent } from '../components';

const router: Router = Router();

router.get('/', ClientComponent.getAllClients);

export default router;