import api from "../api";
const source = "/contacts";
const contactAPI = {
  create: async (payload) => {
    return await api.post(`${source}`, payload);
  },
};

export default contactAPI;
