import { startOfHour, setHours, isWithinInterval } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Op } from 'sequelize';
import Order from '../models/Order';

class StartDeliveryController {
  async put(req, res) {
    const { order_id, courier_id } = req.params;
    const currentDate = new Date();
    const hourStart = setHours(startOfHour(currentDate), 8);
    const hourEnd = setHours(startOfHour(currentDate), 8);
    if (
      isWithinInterval(currentDate, {
        start: hourStart,
        end: hourEnd,
      })
    ) {
      return res.status(401).json({
        error: 'You can only withdraw the deliveries between 08:00h and 18:00h',
      });
    }

    const today_orders = await Order.findAll({
      where: {
        courier_id,
        start_date: {
          [Op.gte]: hourStart,
        },
        end_date: {
          [Op.lte]: hourEnd,
        },
      },
    });

    if (today_orders.length >= 5) {
      return res.json({
        error: 'Courier cannot receive more deliveries today',
      });
    }

    const order = await Order.findOne({
      where: {
        id: order_id,
        start_date: {
          [Op.eq]: null,
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const { id, start_date } = await order.update({
      start_date: zonedTimeToUtc(currentDate, 'America/São_Paulo'),
    });

    return res.json({ id, start_date });
  }
}

export default new StartDeliveryController();
