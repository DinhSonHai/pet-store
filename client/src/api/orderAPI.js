import api from '../api';
const source = '/orders';
const orderAPI = {
  order_guest: async (data) => {
    return await api.post(`${source}`, data);
  },
  order_auth: async (data) => {
    return await api.post(`${source}/auth`, data);
  },
  get_canceled_order: async () => {
    return await api.get(`${source}/orders_canceled/auth`);
  },
  get_completed_order: async () => {
    return await api.get(`${source}/orders_completed/auth`);
  },
  get_processing_order: async () => {
    return await api.get(`${source}/orders_processing/auth`);
  },
  get_by_id: async (id) => {
    return await api.get(`${source}/auth/${id}`);
  },
  get_details: async (id) => {
    return await api.get(`${source}/detail/auth/${id}`);
  },
  cancel_order: async (id) => {
    return api.put(`${source}/auth/${id}`);
  },
};

export default orderAPI;
