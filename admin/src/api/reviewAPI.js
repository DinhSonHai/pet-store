import api from '../api';
const source = '/reviews';
const reviewAPI = {
  get_unconfirmed: async () => {
    return await api.get(`${source}/admin/reviews`);
  },
  decline: async (reviewId, productId) => {
    return await api.put(`${source}/admin/${reviewId}/${productId}/decline`);
  },
  approve: async (reviewId, productId) => {
    return await api.put(`${source}/admin/${reviewId}/${productId}/approve`);
  },
  response: async (reviewId, productId, data) => {
    return await api.put(`${source}/${reviewId}/response/${productId}`, data);
  },
};

export default reviewAPI;
