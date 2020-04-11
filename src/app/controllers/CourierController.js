import * as Yup from 'yup';
import { Op } from 'sequelize';
import Courier from '../models/Courier';

class CourierController {
  async index(req, res) {
    const { q } = req.query;

    const couriers = q
      ? await Courier.findAll({
          where: {
            name: {
              [Op.iLike]: q,
            },
          },
        })
      : await Courier.findAll();

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Courier already exists' });
    }

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

  async update(req, res) {
    const { avatar_id } = req.body;
    const courier = await Courier.findByPk(req.userId);

    courier.update({ avatar_id });
    return res.json(courier);
  }
}

export default new CourierController();
