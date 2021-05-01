const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').user;
module.exports = function (req, res, next) {
  const { role } = req.user;
  if (role !== 0) {
    return res.status(statusCode.forbiddenError).json({
      errors: [{ msg: message.invalidRole }],
    });
  }
  next();
};
