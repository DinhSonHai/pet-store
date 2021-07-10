import api from '../api';
const source = '/bills';
const billAPI = {
  get_all: async (page, from, to) => {
    return await api.get(`${source}/?page=${page}&from=${from}&to=${to}`);
  },
};

export default billAPI;
