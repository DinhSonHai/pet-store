import api from '../api';
const source = '/discountOffer';
const saleAPI = {
  get_all_sales_products: async () => {
    return await api.get(`${source}/products`);
  },
};

export default saleAPI;
