import api from '../api';
const source = '/employee';
const authAPI = {
  get_user: async () => {
    return await api.get(`${source}/user`);
  },
  register: async (data) => {
    return await api.post(`${source}/signup`, data);
  },
  login: async (email, password) => {
    return await api.post(`${source}/signin`, { email, password });
  },
};

export default authAPI;
