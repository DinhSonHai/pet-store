import api from '../api';
const source = '/types';
const typeAPI = {
  get_by_id: async (id) => {
    return await api.get(`${source}/${id}`);
  },
  get_by_catId: async (id) => {
    return await api.get(`${source}/categories/${id}`);
  },
};

export default typeAPI;
