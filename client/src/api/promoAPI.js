import api from '../api';
const source = '/promos';
const promoAPI = {
  get_all: async () => {
    return await api.get(`${source}/client`);
  },
};

export default promoAPI;
