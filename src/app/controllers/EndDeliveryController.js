import { zonedTimeToUtc } from 'date-fns-tz';
import File from '../models/File';
import Order from '../models/Order';

class EndDeliveryController {
  async update(req, res) {
    const currentDate = new Date();
    const { originalname: name, filename: path } = req.file;
    const { courier_id, order_id } = req.params;
    const file = await File.create({ name, path });

    const order = await Order.findOne({
      where: {
        id: order_id,
        courier_id,
      },
    });

    await order.update({
      end_date: zonedTimeToUtc(currentDate, 'America/São_Paulo'),
      signature_id: file.id,
    });
    return res.json(order);
  }
}

export default new EndDeliveryController();
