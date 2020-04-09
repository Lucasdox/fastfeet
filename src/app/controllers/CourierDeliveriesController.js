import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';

class CourierDeliveriesController {
  async index(req, res) {
    const { courier_id } = req.params;

    const orders = await Order.findAll({
      where: {
        courier_id,
        end_date: {
          [Op.eq]: null,
        },
      },
    });

    return res.json(orders);
  }
}

export default new CourierDeliveriesController();
