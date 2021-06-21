import api from '../api';
const source = '/blogs';
const blogAPI = {
  get_all: async (page) => {
    return await api.get(`${source}/?page=${page}`);
  },
  get_by_tags: async (tags, page) => {
    return await api.get(`${source}/tags/?tags=${tags}&page=${page}`);
  },
  get_newest: async () => {
    return await api.get(`${source}/newest`);
  },
  get_by_searching: async (q, page) => {
    return await api.get(`${source}/search/?q=${q}&page=${page}`);
  },
};

export default blogAPI;
