const pagination = (_page, limit) => {
  const page = _page === 'undefined' ? 1 : _page;
  const start = (page - 1) * limit;
  const end = page * limit;
  return { start, end };
};
module.exports = pagination;
