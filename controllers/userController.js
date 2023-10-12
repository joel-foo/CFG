const tryCatch = require('../utils/tryCatch');
const userService = require('../service/userService');

module.exports.post = tryCatch(async (req, res) => {
  const dataToSave = await userService.createUser(req.body);
  res.status(200).json(dataToSave);
});

module.exports.getAll = tryCatch(async (req, res) => {
  const data = await userService.getAllUsers();
  res.status(200).json(data);
});

module.exports.getOne = tryCatch(async (req, res) => {
  const data = await userService.getUserById(req.params);
  res.status(200).json(data);
});

module.exports.update = tryCatch(async (req, res) => {
  const data = await userService.updateUser({
    id: req.params.id,
    updateInfo: req.body,
  });
  res.status(200).send(data);
});

module.exports.delete = tryCatch(async (req, res) => {
  const data = await userService.deleteUser(req.params);
  res.status(200).send(`Document with ${data.name} has been deleted..`);
});
