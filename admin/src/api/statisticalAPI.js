import api from '../api';
const source = '/statistical';
function getData(path) {
  return new Promise((resolve, reject) => {
    api
      .get(path)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (err) {
        reject(err.error);
      });
  });
}
const statisticalAPI = {
  get_dashboard_data: async () => {
    return await Promise.all([
      getData(`${source}/totalrevenues`),
      getData(`${source}/totalrevenues?time=month`),
      getData(`${source}/totalrevenues?time=year`),
      getData(`${source}/newestorders`),
      getData(`${source}/newestreviews`),
      getData(`${source}/users`),
      getData(`${source}/totalbills`),
      getData(`${source}/totalsales`),
    ]);
  },
  get_monthly_revenues: async () => {
    return await api.get(`${source}/totalrevenues?time=month`);
  },
  get_annual_revenues: async () => {
    return await api.get(`${source}/totalrevenues?time=year`);
  },
  get_orders_data: async (year) => {
    return await api.get(`${source}/ordersdatachart/${year}`);
  },
  get_revenues_data: async (year) => {
    return await api.get(`${source}/revenuesdatachart/${year}`);
  },
};

export default statisticalAPI;
