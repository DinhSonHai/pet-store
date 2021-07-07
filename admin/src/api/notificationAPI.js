import api from '../api';
const source = '/notifications';
const notificationAPI = {
  get_all: async () => {
    return await api.get(`${source}/admin`);
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

export default notificationAPI;
