import api from "../api";
const source = "/customers";
const customerAPI = {
  get_all: async (q, page) => {
    return await api.get(`${source}/?q=${q}&page=${page}`);
  },
  get_by_id: async (id) => {
    return await api.get(`${source}/${id}`);
  },
};

export default customerAPI;
