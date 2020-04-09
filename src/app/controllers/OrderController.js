import * as Yup from 'yup';
import { format } from 'date-fns';
import Order from '../models/Order';
import Notification from '../schemas/Notification';
import Recipient from '../models/Recipient';

class OrderController {
  async index(req, res) {
    const schema = Yup.object().shape({
      courier_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fails');
    }

    const { courier_id } = req.body;

    const orders = await Order.findAll({
      where: {
        courier_id,
      },
      attributes: [
        'id',
        'recipient_id',
        'courier_id',
        'signature_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fails');
    }

    const { recipient_id, courier_id, product } = req.body;

    await Order.create(req.body);

    const recipient = await Recipient.findByPk(recipient_id);

    await Notification.create({
      content: `Nova entrega para Rua: ${recipient.rua}, ${recipient.numero}\nProduto: ${product}`,
      courier_id,
    });

    return res.json(req.body);
  }
}

export default new OrderController();
