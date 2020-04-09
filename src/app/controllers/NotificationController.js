import * as Yup from 'yup';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const schema = Yup.object().shape({
      courier_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { courier_id } = req.body;

    const notifications = await Notification.find({
      courier_id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    console.log(notifications);

    return res.json(notifications);
  }
}

export default new NotificationController();
