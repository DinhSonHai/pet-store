import api from '../api';
const source = '/categories';
const categoryAPI = {
  get_all: async () => {
    return await api.get(`${source}`);
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
  restore: async (id) => {
    return await api.patch(`${source}/${id}/restore`);
  },
  get_removed: async () => {
    return await api.delete(`${source}/deleted`);
  },
};

export default categoryAPI;
