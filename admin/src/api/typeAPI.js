import api from '../api';
const source = '/types';
const typeAPI = {
  get_all: async () => {
    return await api.get(`${source}`);
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
  get_removed: async () => {
    return await api.delete(`${source}/deleted`);
  },
};

export default typeAPI;
