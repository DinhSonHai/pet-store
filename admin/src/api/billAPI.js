import api from '../api';
const source = '/bills';
const billAPI = {
  get_all: async (page) => {
    return await api.get(`${source}/?page=${page}`);
  },
};

export default billAPI;
