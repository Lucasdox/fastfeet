import * as Yup from 'yup';
import { zonedTimeToUtc } from 'date-fns-tz';
import DeliveryProblem from '../models/DeliveryProblem';
import Notification from '../schemas/Notification';
import Order from '../models/Order';

class DeliveryProblemController {
  async index(req, res) {
    const { order_id } = req.params;

    const delivery_problems = await DeliveryProblem.findAll({
      where: {
        order_id,
      },
    });

    return res.json(delivery_problems);
  }

  async store(req, res) {
    const schemas = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { order_id } = req.params;
    const { description } = req.body;

    const delivery_problem = await DeliveryProblem.create({
      order_id,
      description,
    });

    return res.json(delivery_problem);
  }

  async destroy(req, res) {
    const { problem_id } = req.params;
    const problem = await DeliveryProblem.findByPk(problem_id);
    const { order_id } = problem;
    const order = await Order.findByPk(order_id);

    const currentDate = new Date();

    await order.update({
      canceled_at: zonedTimeToUtc(currentDate, 'America/São_Paulo'),
    });

    console.log('chegou aqui');

    await Notification.create({
      content: `Olá, sua entrega foi cancelada.`,
      courier_id: order.courier_id,
    });

    return res.json(order);
  }
}

export default new DeliveryProblemController();
