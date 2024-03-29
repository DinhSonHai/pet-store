import api from "../api";
const source = "/products";
const productAPI = {
  get_all: async (page, q) => {
    return await api.get(`${source}/?page=${page}&q=${q}`);
  },
  get_by_type: async (typeId) => {
    return await api.get(`${source}/types/${typeId}/admin`);
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
  get_removed: async (page) => {
    return await api.get(`${source}/deleted/?page=${page}`);
  },
  get_lowquantity: async (page, q) => {
    return await api.get(`${source}/lowquantity/?page=${page}&q=${q}`);
  },
};

export default productAPI;
