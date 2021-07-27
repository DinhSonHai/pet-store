import api from "../api";
const source = "/statistical";
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
  get_statistical_data: async (time = "", from = "", to = "") => {
    return await Promise.all([
      getData(`${source}/totalrevenues/?time=${time}&from=${from}&to=${to}`),
      getData(`${source}/totalbills/?time=${time}&from=${from}&to=${to}`),
      getData(`${source}/totalsales/?time=${time}&from=${from}&to=${to}`),
      getData(`${source}/bestsellers/?time=${time}&from=${from}&to=${to}`),
    ]);
  },
  get_orders_data: async (year) => {
    return await api.get(`${source}/ordersdatachart/${year}`);
  },
  get_revenues_data: async (year) => {
    return await api.get(`${source}/revenuesdatachart/${year}`);
  },
};

export default statisticalAPI;
