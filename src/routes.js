import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import CourierController from './app/controllers/CourierController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

routes.put('/users', UserController.update);

routes.post('/couriers', CourierController.store);
routes.put('/couriers', CourierController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/orders', OrderController.store);

export default routes;
