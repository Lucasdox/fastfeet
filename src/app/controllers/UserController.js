import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const user = await User.create(req.body);

    const { id, name, email } = user;

    return res.json({
      id,
      name,
      email
    });
  }

  async update(req, res) {}
}

export default new UserController();
