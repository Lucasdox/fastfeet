import { Router } from 'express';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/recipients', RecipientController.store);

export default routes;
