import api from '../api';
const source = '/reviews';
const reviewAPI = {
  review: async (data, id) => {
    return await api.post(`${source}/${id}/review`, data);
  },
  get_reviews: async (id) => {
    return await api.get(`${source}/${id}/review`);
  },
};

export default reviewAPI;
