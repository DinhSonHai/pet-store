import api from '../api';
const source = '/receipts';
const receiptAPI = {
  get_all: async (filter, page) => {
    return await api.get(`${source}/?sort=${filter}&page=${page}`);
  },
  get_details: async (id) => {
    return await api.get(`${source}/${id}`);
  },
  create: async (data, note) => {
    return await api.post(`${source}`, { data, note });
  },
};

export default receiptAPI;
