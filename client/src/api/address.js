import api from '../api';

export const getProvince = async () => {
  try {
    const res = await api.get('/client/province');
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getWard = async (id) => {
  try {
    const res = await api.get(`/client/ward/${id}`);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getTown = async (id) => {
  try {
    const res = await api.get(`/client/town/${id}`);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};
