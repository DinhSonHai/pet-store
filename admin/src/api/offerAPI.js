import api from '../api';
const source = '/discountOffer';
const offerApi = {
  get_all: async (page) => {
    return await api.get(`${source}/?page=${page}`);
  },
};

export default offerApi;
