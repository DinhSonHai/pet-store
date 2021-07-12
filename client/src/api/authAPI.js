import api from '../api';
const source = '/auth';
const authAPI = {
  get_user: async () => {
    return await api.get(`${source}/user`);
  },
  register: async (data) => {
    return await api.post(`${source}/signup`, data);
  },
  login: async (email, password) => {
    return await api.post(`${source}/signin`, { email, password });
  },
  login_google: async (idToken) => {
    return await api.post(`${source}/googlelogin`, { idToken });
  },
  login_facebook: async (userID, accessToken) => {
    return await api.post(`${source}/facebooklogin`, { userID, accessToken });
  },
  forgot_password: async (email) => {
    return await api.put(`${source}/forgotpassword`, email);
  },
  reset_password: async (data) => {
    return await api.put(`${source}/resetpassword`, data);
  },
  update: async (data) => {
    return await api.put(`${source}/update_user`, data);
  },
  add_address: async (data) => {
    return await api.put(`${source}/add_address`, data);
  },
  remove_address: async (address_id) => {
    return await api.put(`${source}/remove_address`, { address_id });
  },
  update_address: async (data) => {
    return await api.put(`${source}/update_address`, data);
  },
  action_favorite: async (productId) => {
    return await api.put(`${source}/favorite`, { productId });
  },
  get_favorite: async (page) => {
    return await api.get(`${source}/favorite/?page=${page}`);
  },
  get_purchased: async (page) => {
    return await api.get(`${source}/purchased/?page=${page}`);
  },
  activate: async (token) => {
    return await api.post(`${source}/activate`, token);
  },
};

export default authAPI;
