const Option = require("../db/models/option.js");
class OptionRepository {
  createOption = async (extraPrice, shotPrice, hot) => {
    const option = await Option.create({
      extraPrice,
      shotPrice,
      hot,
    });
    return option;
  };

  viewOption = async () => {
    const option = await Option.findAll();
    return option;
  };

  findOndOption = async (id) => {
    const option = await Option.findOne({
      where: { id },
    });
    return option;
  };

  updateOption = async (id, extraPrice, shotPrice, hot) => {
    const option = await Option.update(
      { extraPrice, shotPrice, hot },
      {
        where: { id },
      }
    );
    return option;
  };

  deleteOption = async (id) => {
    const option = await Option.destroy({
      where: { id },
    });
    return option;
  };
}
module.exports = OptionRepository;
