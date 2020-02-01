import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    const { rua, numero, complemento, estado, cidade, cep } = recipient;

    res.json({
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    });
  }
}

export default new RecipientController();
