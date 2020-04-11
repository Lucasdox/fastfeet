import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import CourierController from './app/controllers/CourierController';
import CourierDeliveriesController from './app/controllers/CourierDeliveriesController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import FinishedDeliveriesController from './app/controllers/FinishedDeliveriesController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import NotificationController from './app/controllers/NotificationController';
import multerConfig from './config/multer';
import EndDeliveryController from './app/controllers/EndDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

/** Create admins */
routes.post('/users', UserController.store);

/** Session */
routes.post('/sessions', SessionController.store);

/** Courier functionalities */
routes.get('/courierdeliveries/:courier_id', CourierDeliveriesController.index);
routes.get(
  '/courierdeliveries/:courier_id/deliveries',
  FinishedDeliveriesController.index
);
routes.put(
  '/courierdeliveries/:courier_id/start_delivery/:order_id',
  StartDeliveryController.update
);
routes.put(
  '/courierdeliveries/:courier_id/end_delivery/:order_id',
  upload.single('file'),
  EndDeliveryController.update
);

routes.get('/deliveries/:order_id/problems', DeliveryProblemController.index);
routes.post('/deliveries/:order_id/problems', DeliveryProblemController.store);
routes.delete(
  '/problems/:problem_id/cancel-delivery',
  DeliveryProblemController.destroy
);
/** from now on, we need to AUTHENTICATE */
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

routes.put('/users', UserController.update);

routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers', CourierController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);

routes.get('/notifications', NotificationController.index);

export default routes;
