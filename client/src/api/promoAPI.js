import api from "../api";
const source = "/promos";
const promoAPI = {
  get_all: async () => {
    return await api.get(`${source}/client`);
  },
  apply: async (name) => {
    return await api.get(`${source}/apply?name=${name}`);
  },
};

export default promoAPI;
