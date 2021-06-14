import api from '../api';
const source = '/blogs';
const blogAPI = {
  get_all: async (page) => {
    return await api.get(`${source}/?page=${page}`);
  },
  create: async (data) => {
    return await api.post(`${source}`, data);
  },
  update: async (id, data) => {
    return await api.put(`${source}/${id}`, data);
  },
  remove: async (id) => {
    return await api.delete(`${source}/${id}`);
  },
};

export default blogAPI;
