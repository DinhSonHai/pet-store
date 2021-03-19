import api from '../api';
const source = '/orders';
const orderAPI = {
  get_by_status: async (status) => {
    return await api.get(`${source}/${status}/admin`);
  },
  get_details: async (id) => {
    return await api.get(`${source}/detail/admin/${id}`);
  },
  cancel_order: async (id) => {
    return await api.put(`${source}/admin/${id}`);
  },
  get_by_id: async (id) => {
    return await api.get(`${source}/admin/${id}`);
  },
  update: async (id) => {
    return await api.put(`${source}/${id}`);
  },
  order: async (data) => {
    return await api.post(`${source}/admin`, data);
  },
};

export default orderAPI;
