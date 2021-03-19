import api from '../api';
const source = '/bills';
const billAPI = {
  get_all: async (filter, page) => {
    return await api.get(`${source}/?sort=${filter}&page=${page}`);
  },
};

export default billAPI;
