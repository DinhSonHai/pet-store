import api from '../api';
const source = '/notifications';
const notificationAPI = {
  get_all: async () => {
    return await api.get(`${source}/client`);
  },
};

export default notificationAPI;
