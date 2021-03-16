import api from '../api';
const source = '/products';
const productAPI = {
  get_by_type: async (id, filterValue, page) => {
    return await api.get(
      `${source}/types/${id}/?sort=${filterValue}&page=${page}`
    );
  },
  get_by_id: async (id) => {
    return await api.get(`${source}/${id}`);
  },
  get_by_searching: async (q, filterValue, page) => {
    return await api.get(
      `${source}/search?q=${q}&sort=${filterValue}&page=${page}`
    );
  },
};

export default productAPI;
