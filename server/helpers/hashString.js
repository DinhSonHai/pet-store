const bcrypt = require('bcryptjs');
const hashString = async (stringNeedHash) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(stringNeedHash, salt);
  return hashedString;
};
module.exports = hashString;
