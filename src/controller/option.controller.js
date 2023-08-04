const OptionService = require("../service/option.service.js");

class OptionController {
  constructor() {
    this.optionService = new OptionService();
  }
  createOption = async (req, res) => {
    const { extraPrice, shotPrice, hot } = req.body;
    const result = await this.optionService.createOption(
      extraPrice,
      shotPrice,
      hot
    );
    if (result.status === 400) {
      return res.status(400).json({ errorMessage: result.errorMessage });
    } else {
      return res.status(200).json({ message: result.message });
    }
  };

  viewOption = async (req, res) => {
    const result = await this.optionService.viewOption();

    if (result.status === 400) {
      return res.status(400).json({ errorMessage: result.errorMessage });
    } else {
      return res.status(200).json({ message: result.message });
    }
  };

  updateOption = async (req, res) => {
    const { id } = req.params;
    const { extraPrice, shotPrice, hot } = req.body;
    const result = await this.optionService.updateOption(
      id,
      extraPrice,
      shotPrice,
      hot
    );

    if (result.status === 400) {
      return res.status(400).json({ errorMessage: result.errorMessage });
    } else {
      return res.status(200).json({ message: result.message });
    }
  };

  deleteOption = async (req, res) => {
    const { id } = req.params;
    const result = await this.optionService.deleteOption(id);

    if (result.status === 400) {
      return res.status(400).json({ errorMessage: result.errorMessage });
    } else {
      return res.status(200).json({ message: result.message });
    }
  };
}
module.exports = OptionController;
