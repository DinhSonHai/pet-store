import api from '../api';
const source = '/products';
const productAPI = {
  get_all: async (filter, page) => {
    return await api.get(`${source}/?sort=${filter}&page=${page}`);
  },
  create: async (data) => {
    return await api.post(`${source}`, data);
  },
  update: async (data) => {
    return await api.put(`${source}`, data);
  },
  remove: async (id) => {
    return await api.delete(`${source}/${id}`);
  },
  restore: async (id) => {
    return await api.patch(`${source}/${id}/restore`);
  },
  get_removed: async (page) => {
    return await api.delete(`${source}/deleted/?page=${page}`);
  },
};

export default productAPI;
