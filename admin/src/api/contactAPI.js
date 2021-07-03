import api from "../api";
const source = "/contacts";
const contactAPI = {
  get_all: async (page) => {
    return await api.get(`${source}/?page=${page}`);
  },
  update: async (id) => {
    return await api.put(`${source}/${id}`);
  },
};

export default contactAPI;
