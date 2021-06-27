import api from '../api';
const source = '/discountOffer';
const offerApi = {
  get_all: async (page) => {
    return await api.get(`${source}/?page=${page}`);
  },
  get_by_id: async (id) => {
    return await api.get(`${source}/${id}`);
  },
  activate_offer: async (id) => {
    return await api.put(`${source}/${id}/activate`);
  },
  deactivate_offer: async (id) => {
    return await api.put(`${source}/${id}/deactivate`);
  }
};

export default offerApi;
