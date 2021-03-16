import api from '../api';
const source = '/client';
const addressAPI = {
  get_province: async () => {
    return await api.get(`${source}/province`);
  },
  get_ward: async (id) => {
    return await api.get(`${source}/ward/${id}`);
  },
  get_town: async (id) => {
    return await api.get(`${source}/town/${id}`);
  },
};

export default addressAPI;
