import { Op } from 'sequelize';
import Order from '../models/Order';

class FinishedDeliveriesController {
  async index(req, res) {
    const { courier_id } = req.params;

    const orders = await Order.findAll({
      where: {
        courier_id,
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'courier_id', 'recipient_id'],
    });

    return res.json(orders);
  }
}

export default new FinishedDeliveriesController();
